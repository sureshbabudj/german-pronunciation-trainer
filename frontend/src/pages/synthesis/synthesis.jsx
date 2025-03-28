import axios from "axios";
import { Block, BlockHeader, BlockTitle, Button } from "konsta/react";
import { useState } from "react";

export default function SynthesisPage() {
  const [text, setText] = useState("");
  const [ttsAudio, setTtsAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle API Call: Synthesize Speech
  const synthesizeSpeech = async () => {
    if (!text) return alert("Please enter text for Text To Speech!");

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
    <Block strong inset className="space-y-4">
      <label
        htmlFor="tts-text"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Text to Speech
      </label>
      <textarea
        name="tts-text"
        id="tts-text"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter German text here..."
      ></textarea>
      <Button
        large
        rounded
        onClick={synthesizeSpeech}
        disabled={loading}
        className="!bg-blue-500 !hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Synthesizing..." : "Generate Speech"}
      </Button>
      {ttsAudio && (
        <div className="mt-4">
          <audio controls className="w-full">
            <source src={URL.createObjectURL(ttsAudio)} type="audio/wav" />
            Your browser does not support audio playback.
          </audio>
        </div>
      )}
    </Block>
  );
}
