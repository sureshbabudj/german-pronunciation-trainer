import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

// Helper to determine color for word feedback
function getColor(confidence) {
  if (confidence > 0.85) return "green-500"; // Correct
  if (confidence > 0.5) return "orange-500"; // Deviation
  return "red-500"; // Incorrect
}

export const MediaRecorder = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    }
  );

  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [wordFeedback, setWordFeedback] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-2">
      <h1 className="text-sm font-bold mb-4">Audio Processor</h1>

      <div className="flex flex-row items-center gap-4 mb-4">
        <button
          onClick={startRecording}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          🎙️ Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          🛑 Stop Recording
        </button>
      </div>

      {mediaBlobUrl && (
        <div className="flex flex-col gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Recorded Audio:</h3>
            <audio src={mediaBlobUrl} controls className="mb-2 w-full" />
          </div>
          <button
            onClick={processAudio}
            disabled={!mediaBlobUrl || loading}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
              !mediaBlobUrl || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Process Audio"}
          </button>
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
