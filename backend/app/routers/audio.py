from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import FileResponse
from app.utils import vosk_integration, tts_integration, audio_utils
from pydantic import BaseModel
import os
import logging

logging.basicConfig(level=logging.DEBUG)

router = APIRouter(
    prefix="/audio",
    tags=["Audio Processing"]
)

@router.post("/process")
async def process_audio(file: UploadFile):
    try:
        audio_data = await file.read()

        # Convert audio to Vosk-compatible format
        converted_audio = audio_utils.convert_audio(audio_data)

        # Perform speech recognition using Vosk
        transcription, word_timestamps = vosk_integration.recognize_audio(converted_audio)

        return {
            "transcription": transcription,
            "word_timestamps": word_timestamps
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")

class TTSRequest(BaseModel):
    text: str  # Expected format: JSON body containing "text"

@router.post("/synthesize")
async def synthesize_speech(payload: TTSRequest):
    logging.debug(f"Received payload: {payload}")
    try:
        text = payload.text
        output_path = "output.wav"
        tts_integration.generate_tts(text)

        if not os.path.exists(output_path):
            logging.error("Output file not created.")
            raise HTTPException(status_code=500, detail="Error synthesizing speech: Output file not created")
        
        logging.info("Returning audio file.")
        return FileResponse(path=output_path, media_type="audio/wav", filename="output.wav")
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error synthesizing speech: {str(e)}")
