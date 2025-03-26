#!/bin/bash

# Define variables for directories and files
MODELS_DIR="backend/app/models"
VOSK_ZIP_URL="https://alphacephei.com/vosk/models/vosk-model-small-de-0.15.zip"
VOSK_MODEL_DIR="$MODELS_DIR/vosk-model-small-de-0.15"
PIPER_MODEL_URL="https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/karlsson/low/de_DE-karlsson-low.onnx?download=true"
PIPER_CONFIG_URL="https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/de/de_DE/karlsson/low/de_DE-karlsson-low.onnx.json?download=true.json"
PIPER_MODEL="$MODELS_DIR/de_DE-karlsson-low.onnx"
PIPER_CONFIG="$MODELS_DIR/de_DE-karlsson-low.onnx.json"

# Create the models directory if it doesn't exist
mkdir -p "$MODELS_DIR"

# Download and extract the VOSK model if not already present
if [ ! -d "$VOSK_MODEL_DIR" ]; then
    echo "Downloading and extracting VOSK model..."
    wget -O vosk-model.zip "$VOSK_ZIP_URL"
    unzip vosk-model.zip -d "$MODELS_DIR"
    rm vosk-model.zip
else
    echo "VOSK model already exists. Skipping download."
fi

# Download Piper model if not already present
if [ ! -f "$PIPER_MODEL" ]; then
    echo "Downloading Piper model..."
    wget -O "$PIPER_MODEL" "$PIPER_MODEL_URL"
else
    echo "Piper model already exists. Skipping download."
fi

# Download Piper configuration if not already present
if [ ! -f "$PIPER_CONFIG" ]; then
    echo "Downloading Piper configuration..."
    wget -O "$PIPER_CONFIG" "$PIPER_CONFIG_URL"
else
    echo "Piper configuration already exists. Skipping download."
fi

echo "Setup completed successfully."
