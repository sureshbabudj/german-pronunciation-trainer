#!/bin/bash

# Default values
DEPLOY_ALL=true
DEPLOY_BACKEND=true
DEPLOY_FRONTEND=true

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --all)
      DEPLOY_ALL=true
      DEPLOY_BACKEND=true
      DEPLOY_FRONTEND=true
      ;;
    --skip-backend)
      DEPLOY_BACKEND=false
      ;;
    --skip-frontend)
      DEPLOY_FRONTEND=false
      ;;
    *)
      echo "Error: Invalid option: $1"
      exit 1
      ;;
  esac
  shift
done

# Detect GCP Project ID
GCP_PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$GCP_PROJECT_ID" ]; then
    echo "Error: GCP project ID not found. Please configure your GCP project using 'gcloud config set project <your-project-id>'."
    exit 1
fi

# Detect GCP Region
GCP_REGION=$(gcloud config get-value compute/region 2>/dev/null)
if [ -z "$GCP_REGION" ]; then
    echo "Error: GCP region not found. Please configure your GCP region using 'gcloud config set compute/region <your-region>'."
    exit 1
fi

# Configuration
CLOUD_RUN_SERVICE_NAME="backend-service"
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"
GCP_PROJECT_ID=german-pronunciation-trainer

# --- Docker Login to GCR ---
if $DEPLOY_BACKEND; then
  echo "Logging into GCR..."
  docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://gcr.io
fi

# --- Build and deploy Fronend  ---
if $DEPLOY_FRONTEND; then
  # --- Frontend Deployment ---
  echo "Building React frontend..."
  cd "$FRONTEND_DIR"
  npm run build

  # --- Firebase Deployment ---
  echo "Setting firebase project"
  firebase use --project "$GCP_PROJECT_ID"

  # --- Updating Firebase Hosting Rewrites ---
  echo "Updating Firebase Hosting rewrites..."
  sed -i "" "s|<your-cloud-run-region>|${GCP_REGION}|g" "firebase.json"

  echo "Deploying frontend to Firebase Hosting..."
  firebase deploy --only hosting --project "$GCP_PROJECT_ID"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to deploy frontend to Firebase Hosting."
    exit 1
  fi

  cd ..
fi

# --- Build and deploy Backend  ---
if $DEPLOY_BACKEND; then

  # --- Install Models ---
  echo "Installing models..."
  bash setup_models.sh

  # --- Build and Push piper-base Image ---
  echo "Building and pushing piper-base Docker image..."
  cd "$BACKEND_DIR"
  docker build --platform linux/amd64 -f Dockerfile.base -t piper-base .
  docker tag piper-base gcr.io/"$GCP_PROJECT_ID"/piper-base:latest
  docker push gcr.io/"$GCP_PROJECT_ID"/piper-base:latest
  if [ $? -ne 0 ]; then
    echo "Error: Failed to push piper-base image."
    exit 1
  fi
  cd ..

  # --- Backend Deployment ---
  echo "Building and pushing backend Docker image..."
  cd "$BACKEND_DIR"
  docker build --platform linux/amd64 -t backend-image .
  docker tag backend-image gcr.io/"$GCP_PROJECT_ID"/"$CLOUD_RUN_SERVICE_NAME"
  docker push gcr.io/"$GCP_PROJECT_ID"/"$CLOUD_RUN_SERVICE_NAME"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to push backend-service image."
    exit 1
  fi

  cd ..

  echo "Deploying backend to Cloud Run..."
  gcloud run deploy "$CLOUD_RUN_SERVICE_NAME" \
  --image gcr.io/"$GCP_PROJECT_ID"/"$CLOUD_RUN_SERVICE_NAME" \
  --region "$GCP_REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8000

  if [ $? -ne 0 ]; then
    echo "Error: Failed to deploy backend to Cloud Run."
    exit 1
  fi
fi

echo "Deployment complete!"