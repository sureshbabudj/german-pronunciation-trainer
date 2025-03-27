from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import audio

app = FastAPI(
    title="German Pronunciation Trainer Backend",
    description="Handles audio processing, Vosk integration, and TTS",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now (not recommended in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(audio.router, prefix="/api", tags=["audio"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the German Pronunciation Trainer Backend"}
