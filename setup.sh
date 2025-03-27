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

# Navigate back to project root
cd ..

# Use Docker Compose to build and start both backend and frontend services
echo "Building and starting backend and frontend containers using Docker Compose..."
docker-compose up --build -d

# Print success message
echo "Setup complete. Backend is running on port 8000, and frontend is running on port 3000."
