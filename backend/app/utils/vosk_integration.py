import vosk
import json

def recognize_audio(audio_data):
    model_path = "/app/models/vosk-model-small-de-0.15"
    model = vosk.Model(model_path)

    recognizer = vosk.KaldiRecognizer(model, 16000)
    recognizer.AcceptWaveform(audio_data)

    result = json.loads(recognizer.Result())
    transcription = result.get("text", "")
    word_timestamps = result.get("result", [])
    return transcription, word_timestamps
