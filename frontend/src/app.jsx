import React, { useState } from "react";
import axios from "axios";
import { MediaRecorder } from "./record";

axios.defaults.baseURL = '/api';

function App() {
  // State Management
  const [text, setText] = useState("");
  const [ttsAudio, setTtsAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle API Call: Synthesize Speech
  const synthesizeSpeech = async () => {
    if (!text) return alert("Please enter text for TTS!");
    setLoading(true);

    setTtsAudio(null);

    try {
      const response = await axios.post(
        "/audio/synthesize",
        { text },
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTtsAudio(new Blob([response.data], { type: "audio/wav" }));
    } catch (error) {
      console.error("Error synthesizing speech:", error);
      alert("Failed to synthesize speech. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 sm:p-6 lg:p-8">
      {/* Reduced padding */}
      <div className="max-w-3xl mx-auto bg-white md:rounded-lg md:shadow-xl overflow-hidden">
        <div className="bg-indigo-600 py-4 px-4 sm:px-6">
          {/* Reduced header padding */}
          <h1 className="md:text-2xl text-white">
            {/* Slightly smaller heading */}
            German Pronunciation Trainer
          </h1>
        </div>
        <p className="m-2 px-2 text-xs text-indigo-700">
          {/* Adjusted text size and line height */}
          Practice your German pronunciation with audio recording and
          text-to-speech.
        </p>
        <div className="p-6">
          {/* Adjusted content padding */}
          {/* Upload Audio File */}
          <MediaRecorder />
          {/* Text-to-Speech (TTS) */}
          <div className="mt-6">
            {/* Adjusted margin */}
            <h1 className="text-sm font-bold mb-4">Text to Speech</h1>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                type="text"
                name="tts-text"
                id="tts-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full h-3xl rounded-sm p-2 sm:text-sm border-gray-300"
                placeholder="Enter German text here"
              />
            </div>
            <button
              onClick={synthesizeSpeech}
              className="mt-3 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed" /* Increased button padding */
              disabled={loading}
            >
              {loading ? "Synthesizing..." : "Generate Speech"}
            </button>
            {ttsAudio && (
              <div className="mt-4">
                <audio controls className="w-full">
                  <source
                    src={URL.createObjectURL(ttsAudio)}
                    type="audio/wav"
                  />
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
