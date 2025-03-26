from pydub import AudioSegment
AudioSegment.converter = "/usr/bin/ffmpeg"

from io import BytesIO

def convert_audio(audio_data):
    audio = AudioSegment.from_file(BytesIO(audio_data))
    audio = audio.set_channels(1).set_frame_rate(16000).set_sample_width(2)
    output = BytesIO()
    audio.export(output, format="wav")
    return output.getvalue()
