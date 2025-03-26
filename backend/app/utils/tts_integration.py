def generate_tts(text):
    import subprocess

    # Define the command to run Piper TTS
    command = [
        "piper",
        "--model", "/app/models/de_DE-karlsson-low.onnx",
        "--output_file", "output.wav"
    ]

     # Run the command, piping the text to Piper's stdin
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    process.communicate(input=text.encode('utf-8'))

    # Read the audio file and return its contents
    output_path = "output.wav"
    with open(output_path, "rb") as audio_file:
        return audio_file.read()