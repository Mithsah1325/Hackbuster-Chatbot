import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import validator from "validator";  // To validate URLs

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "🔐 Hi! I'm your cybersecurity awareness assistant. Ask me anything about online safety, phishing, social engineering, or cybersecurity best practices!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [urlInput, setUrlInput] = useState("");  // Separate input for URL analysis
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [urlResult, setUrlResult] = useState("");  // URL analysis result
  const messagesEndRef = useRef(null);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);
  const stopTimeout = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUploadFile = async () => {
    if (!file) return;

    // Assuming a backend endpoint to process the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze-file', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setMessages((prev) => [...prev, { text: `File processed: ${result.report}`, sender: "bot" }]);
    } catch (error) {
      console.error("Error uploading the file", error);
      setMessages((prev) => [...prev, { text: "⚠️ Error processing the file.", sender: "bot" }]);
    }
  };

  const analyzeUrl = async (url) => {
    if (validator.isURL(url)) {
      setUrlResult("Analyzing URL...");
      try {
        // Assuming you've set up an API for URL analysis
        const response = await fetch(`/api/analyze-url?url=${encodeURIComponent(url)}`);
        const result = await response.json();
        setUrlResult(result.isSafe ? "This URL is safe." : "Warning: This URL is potentially unsafe.");
      } catch (error) {
        setUrlResult("Error analyzing the URL.");
      }
    } else {
      setUrlResult("Invalid URL entered.");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Make API call to the generative model for AI response
      const response = await fetch('/api/generate-response', {  // Adjust the backend API URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `You are an AI security trainer specializing in cybersecurity education. For every topic, first provide a clear and precise definition. Then, explain the concept in simple terms with one or two easy-to-understand examples. Finally, summarize the topic in a simple and concise way so that anyone can easily understand it. User input: ${input}`,
          model: "gemini-1.5-flash",  // Example model name
        }),
      });

      const data = await response.json();
      const botResponse = { text: data.generatedText || "⚠️ I couldn't process that request. Try again.", sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error calling API:", error);
      setMessages((prev) => [...prev, { text: "🚨 Error connecting to the AI service. Please try again later.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <button onClick={onClose} className="text-white hover:text-red-400">
          <X size={24} />
        </button>
      </div>

      {/* Main content (centered messages) */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-xl w-full mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 ml-auto max-w-[80%] text-right" : "bg-gray-100 mr-auto max-w-[80%]"}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 mr-auto p-2 rounded-lg max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input container fixed at the bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Ask about cybersecurity..."
            className="flex-grow border p-2 rounded-l focus:outline-none"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green-600 text-white p-2 rounded-r hover:bg-green-700 disabled:bg-green-400"
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ""}
          >
            Send
          </button>
        </div>

        {/* File upload and URL input */}
        <div className="mt-2 flex items-center space-x-4">
          <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
          <button
            onClick={handleUploadFile}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={isLoading || !file}
          >
            Upload File
          </button>
        </div>

        <div className="mt-2 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Paste a URL to analyze"
            className="flex-grow border p-2 rounded-l focus:outline-none"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            onClick={() => analyzeUrl(urlInput)}
            className="bg-yellow-600 text-white p-2 rounded-r hover:bg-yellow-700"
          >
            Analyze URL
          </button>
        </div>
        {urlResult && <div className="mt-2 text-sm text-gray-700">{urlResult}</div>}
      </div>
    </div>
  );
};

export default Chatbot;
