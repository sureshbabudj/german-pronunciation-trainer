#!/bin/bash

# Exit immediately if a command fails
set -e

# Run setup_models.sh
echo "Running setup_models.sh..."
bash setup_models.sh

# Go to backend directory
echo "Navigating to backend..."
cd backend

# Build the base Docker image (piper-base)
echo "Building Dockerfile.base as piper-base..."
docker build -f Dockerfile.base -t piper-base .

# Build the main Docker image (german-pronounciation-trainer)
echo "Building Dockerfile as german-pronounciation-trainer..."
docker build -t german-pronounciation-trainer .

# Run the german-pronounciation-trainer container
echo "Running german-pronounciation-trainer container..."
docker run -d --rm --name german-pronounciation-trainer -p 8000:8000 german-pronounciation-trainer

# Go to frontend directory
echo "Navigating to frontend..."
cd ../frontend

# Build and run the frontend Docker image
echo "Building frontend Docker image..."
docker build -t react-frontend .

# Run the frontend React app container
echo "Running frontend React app container..."
docker run -d --rm --name react-frontend -p 3000:3000 react-frontend

# Print success message
echo "Setup complete. Backend is running on port 8000, and frontend is ready to serve."
