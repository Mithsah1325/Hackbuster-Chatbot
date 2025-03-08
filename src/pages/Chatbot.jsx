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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  // Mock file analysis function (replace with actual API when available)
  const handleUploadFile = async () => {
    if (!file) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: `Analyzing file: ${file.name}`, sender: "bot" }]);

    try {
      // If you have an actual backend API, replace this block with actual API call
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example file analysis result based on file type
      let analysisResult;
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (['exe', 'bat', 'com', 'cmd', 'scr', 'vbs', 'js'].includes(fileExtension)) {
        analysisResult = "⚠️ Warning: This file type could potentially contain malicious code. Exercise caution before executing.";
      } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
        analysisResult = "🔍 This document file type should be scanned with antivirus software before opening, as it can contain macros or embedded code.";
      } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        analysisResult = "✅ Image files are generally safer, but can still contain hidden malicious code in rare cases.";
      } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(fileExtension)) {
        analysisResult = "⚠️ Compressed archives can contain hidden malicious files. Always scan before extracting.";
      } else {
        analysisResult = "🔍 This file should be scanned with up-to-date antivirus software before opening.";
      }
      
      setMessages((prev) => [...prev, { text: analysisResult, sender: "bot" }]);
    } catch (error) {
      console.error("Error analyzing the file", error);
      setMessages((prev) => [...prev, { text: "⚠️ Error processing the file.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';
    }
  };

  // Mock URL analysis function (replace with actual API when available)
  const analyzeUrl = async (url) => {
    if (!validator.isURL(url)) {
      setUrlResult("❌ Invalid URL entered. Please enter a valid URL including http:// or https://");
      return;
    }
    
    setIsAnalyzing(true);
    setUrlResult("🔍 Analyzing URL...");
    
    try {
      // If you have an actual backend API, replace this block with actual API call
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple URL risk assessment based on common patterns
      // In a real application, you would use a proper security API
      const lowercaseUrl = url.toLowerCase();
      
      // Check for common phishing indicators
      const suspiciousTerms = ['login', 'sign-in', 'account', 'secure', 'verify', 'bank', 'paypal', 'wallet'];
      const containsSuspiciousTerm = suspiciousTerms.some(term => lowercaseUrl.includes(term));
      
      // Check for URL tricks like misleading domains
      const hasIPAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
      const hasManySubdomains = (url.match(/\./g) || []).length > 3;
      const hasSuspiciousPath = url.includes('%') || url.includes('redirect') || url.includes('url=');
      
      if (hasIPAddress) {
        setUrlResult("⚠️ Warning: This URL uses an IP address instead of a domain name, which is often associated with phishing attempts.");
      } else if (hasManySubdomains) {
        setUrlResult("⚠️ Warning: This URL contains many subdomains, which can be a technique to disguise malicious websites.");
      } else if (hasSuspiciousPath) {
        setUrlResult("⚠️ Warning: This URL contains redirect parameters or encoded characters, which might lead to an unexpected destination.");
      } else if (containsSuspiciousTerm && !url.startsWith('https://')) {
        setUrlResult("⚠️ Warning: This URL contains sensitive terms but doesn't use secure HTTPS protocol.");
      } else if (!url.startsWith('https://')) {
        setUrlResult("⚠️ This URL uses HTTP instead of HTTPS, which means data sent to this site is not encrypted.");
      } else {
        setUrlResult("✅ No obvious security issues detected with this URL, but always be cautious with unfamiliar websites.");
      }
      
      // Add the analysis to the chat for better visibility
      setMessages((prev) => [...prev, { 
        text: `URL Analysis for ${url}:\n${urlResult}`, 
        sender: "bot" 
      }]);
      
      // Clear the URL input after analysis
      setUrlInput("");
    } catch (error) {
      console.error("Error analyzing the URL:", error);
      setUrlResult("⚠️ Error analyzing the URL.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // If you have an actual Gemini API setup, use that instead
      // This is a mock response for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let botResponse;
      const userQuery = input.toLowerCase();
      
      // Basic example responses based on keywords in the user's query
      if (userQuery.includes('phishing')) {
        botResponse = { 
          text: "**Phishing**: Phishing is a type of social engineering attack where attackers masquerade as trusted entities to trick victims into revealing sensitive information.\n\n**Example**: You receive an email claiming to be from your bank, stating there's an urgent problem with your account. The email contains a link to a fake website that looks identical to your bank's site, where you're asked to enter your login credentials.\n\n**In simple terms**: Phishing is when someone pretends to be a trusted organization to trick you into giving them your personal information or passwords.", 
          sender: "bot" 
        };
      } else if (userQuery.includes('password')) {
        botResponse = { 
          text: "**Strong Passwords**: A strong password is a combination of characters that is difficult for humans and computers to guess.\n\n**Examples**: A strong password might look like 'T5%kL9@pRs2!' instead of something predictable like 'password123'. Use a password manager to create and store unique, complex passwords for each service.\n\n**In simple terms**: Create passwords that are long, use a mix of letters, numbers, and symbols, and never reuse them across different websites or services.", 
          sender: "bot" 
        };
      } else if (userQuery.includes('vpn')) {
        botResponse = { 
          text: "**VPN (Virtual Private Network)**: A VPN creates an encrypted tunnel for your internet traffic, hiding your activities and location from potential observers.\n\n**Example**: When using public WiFi at a coffee shop, a VPN encrypts your connection so others on the same network can't see what websites you're visiting or intercept your data.\n\n**In simple terms**: A VPN is like a secure, private tunnel for your internet connection that helps keep your online activities private, especially on public networks.", 
          sender: "bot" 
        };
      } else {
        botResponse = { 
          text: "I'm your cybersecurity assistant! I can help with topics like phishing, passwords, VPNs, malware, two-factor authentication, social engineering, and other online security best practices. What specific aspect of cybersecurity would you like to learn about?", 
          sender: "bot" 
        };
      }
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
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
  
  const handleUrlKeyPress = (e) => {
    if (e.key === "Enter" && urlInput.trim() !== "") {
      analyzeUrl(urlInput);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}

      {/* Main content (centered messages) */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="max-w-xl w-full mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg ${
                msg.sender === "user" 
                  ? "bg-blue-100 ml-auto max-w-[80%] text-right" 
                  : "bg-white shadow-sm mr-auto max-w-[80%]"
              }`}
            >
              {msg.text.split('\n').map((line, i) => (
                <div key={i} className={i > 0 ? "mt-2" : ""}>{line}</div>
              ))}
            </div>
          ))}
          {isLoading && (
            <div className="bg-white shadow-sm mr-auto p-3 rounded-lg max-w-[80%]">
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
      <div className="bg-white border-t p-4">
        <div className="max-w-xl mx-auto">
          {/* Chat input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about cybersecurity..."
              className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center w-16"
              onClick={handleSendMessage}
              disabled={isLoading || input.trim() === ""}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send"
              )}
            </button>
          </div>

          {/* URL analysis section */}
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700 mb-1">URL Analysis</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="https://example.com"
                className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyPress={handleUrlKeyPress}
              />
              <button
                onClick={() => analyzeUrl(urlInput)}
                className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 disabled:bg-yellow-400 flex items-center justify-center w-24"
                disabled={isAnalyzing || urlInput.trim() === ""}
              >
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Analyze"
                )}
              </button>
            </div>
            {urlResult && (
              <div className={`mt-2 text-sm p-2 rounded ${
                urlResult.includes("✅") ? "bg-green-100 text-green-800" :
                urlResult.includes("⚠️") ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-700"
              }`}>
                {urlResult}
              </div>
            )}
          </div>

          {/* File upload section */}
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700 mb-1">File Analysis</h3>
            <div className="flex items-center space-x-2">
              <input 
                type="file" 
                id="file-upload"
                onChange={handleFileChange} 
                className="flex-grow text-sm border p-2 rounded" 
              />
              <button
                onClick={handleUploadFile}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-green-400 flex items-center justify-center w-24"
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Analyze"
                )}
              </button>
            </div>
            {file && <div className="mt-1 text-xs text-gray-500">Selected file: {file.name}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;