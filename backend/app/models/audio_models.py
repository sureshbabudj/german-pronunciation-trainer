from pydantic import BaseModel
from typing import List, Optional

class AudioData(BaseModel):
    audio_file: bytes  # Binary data for the uploaded audio file

class WordTimestamp(BaseModel):
    word: str          # Recognized word
    start_time: float  # Start time of the word in seconds
    end_time: float    # End time of the word in seconds
    confidence: float  # Confidence score for the word recognition

class ProcessedAudioResponse(BaseModel):
    transcription: str                 # Full transcription of the audio
    word_timestamps: List[WordTimestamp]  # List of word timestamps for detailed feedback

class TTSRequest(BaseModel):
    text: str  # Text input for TTS synthesis

class TTSResponse(BaseModel):
    tts_audio: bytes  # Binary data for the synthesized speech
