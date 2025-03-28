import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { Block, Button } from "konsta/react";
import AnimatedButton from "../../components/animated-button/animated-button";

// Helper to determine color for word feedback
function getColor(confidence) {
  if (confidence > 0.85) return "green-500"; // Correct
  if (confidence > 0.5) return "orange-500"; // Deviation
  return "red-500"; // Incorrect
}

const HomePage = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    }
  );

  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [wordFeedback, setWordFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [recording, setRecording] = useState(false);

  const processAudio = async () => {
    try {
      setError(null);

      if (!mediaBlobUrl) {
        alert("Please record an audio file first!");
        return;
      }

      setLoading(true);

      // Fetch the recorded audio blob from the mediaBlobUrl
      const response = await fetch(mediaBlobUrl);
      const audioBlob = await response.blob();

      // Prepare FormData
      const formData = new FormData();
      formData.append("file", audioBlob, "recorded_audio.wav");

      // API Call
      const apiResponse = await axios.post("/audio/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set transcription and feedback
      setTranscription(apiResponse.data.transcription);
      setWordFeedback(apiResponse.data.word_timestamps);
    } catch (err) {
      console.error("Error processing audio:", err);
      setError("Failed to process audio. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecording(!recording);
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex flex-row justify-center gap-4 m-4 ">
        <AnimatedButton
          onClick={toggleRecording}
          animate={recording}
          className="w-16 h-16"
        />
      </div>

      {mediaBlobUrl && (
        <div className="flex flex-col gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Recorded Audio:</h3>
            <audio src={mediaBlobUrl} controls className="mb-2 w-full" />
          </div>
          <Button
            large
            rounded
            onClick={processAudio}
            disabled={!mediaBlobUrl || loading}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
              !mediaBlobUrl || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 8.88916C13.6569 8.88916 15 10.2323 15 11.8892C15 13.1954 14.1652 14.3066 13 14.7185V19.8892H11V14.7185C9.83481 14.3066 9 13.1954 9 11.8892C9 10.2323 10.3431 8.88916 12 8.88916ZM12 10.8892C12.5523 10.8892 13 11.3369 13 11.8892C13 12.4414 12.5523 12.8892 12 12.8892C11.4477 12.8892 11 12.4414 11 11.8892C11 11.3369 11.4477 10.8892 12 10.8892Z"
                fill="currentColor"
              />
              <path
                d="M7.05019 6.93938C5.78348 8.20612 5 9.9561 5 11.8891C5 14.0666 5.99426 16.0119 7.55355 17.2957L8.97712 15.8721C7.7757 14.9589 7 13.5146 7 11.8891C7 10.5084 7.55962 9.25841 8.46441 8.35359L7.05019 6.93938Z"
                fill="currentColor"
              />
              <path
                d="M15.5355 8.35348C16.4403 9.25831 17 10.5083 17 11.8891C17 13.5146 16.2243 14.959 15.0228 15.8722L16.4463 17.2958C18.0057 16.012 19 14.0666 19 11.8891C19 9.95604 18.2165 8.20602 16.9497 6.93927L15.5355 8.35348Z"
                fill="currentColor"
              />
              <path
                d="M1 11.8891C1 8.85152 2.23119 6.10155 4.22176 4.11095L5.63598 5.52516C4.00733 7.15383 3 9.40381 3 11.8891C3 14.3743 4.00733 16.6243 5.63597 18.2529L4.22175 19.6672C2.23119 17.6766 1 14.9266 1 11.8891Z"
                fill="currentColor"
              />
              <path
                d="M19.7781 19.6673C21.7688 17.6767 23 14.9266 23 11.8891C23 8.85147 21.7688 6.10145 19.7781 4.11084L18.3639 5.52505C19.9926 7.15374 21 9.40376 21 11.8891C21 14.3744 19.9926 16.6244 18.3639 18.2531L19.7781 19.6673Z"
                fill="currentColor"
              />
            </svg>
            {" "}
            {loading ? "Processing..." : "Transcribe Audio"}
          </Button>
        </div>
      )}

      {/* Display Transcription and Feedback */}
      {transcription && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-bold text-lg text-gray-800 mb-2">
            Transcription:
          </h2>
          <p className="text-gray-700">{transcription}</p>
        </div>
      )}

      {wordFeedback?.length > 0 && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="font-bold text-lg text-gray-800 mb-2">
            Word Feedback:
          </h2>
          <ul className="list-disc pl-5">
            {wordFeedback.map((word, index) => (
              <li key={index} className={`text-${getColor(word.confidence)}`}>
                <span className="font-medium">{word.word}</span> (
                {word.start_time.toFixed(2)}s - {word.end_time.toFixed(2)}s)
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <p className="text-red-500 font-semibold p-2 bg-red-100 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default HomePage;
