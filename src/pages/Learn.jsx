import React, { useState } from 'react';

const Learn = () => {
  // State to manage the modal visibility and the selected image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Function to open the modal with the clicked image
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Learn About Phishing</h1>

      {/* Blog/Article Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What is Phishing?</h2>
        <p className="text-lg mb-6">
          Phishing is a type of cyber attack where attackers attempt to trick
          people into providing sensitive information like passwords, credit card
          details, or other personal data by pretending to be a trustworthy source.
        </p>
        <p className="text-lg mb-6">
          Phishing can happen via email, text messages, or fake websites, and it's
          becoming increasingly sophisticated. It's important to recognize the signs
          of phishing to protect yourself and your information.
        </p>

        <h3 className="text-xl font-semibold mb-4">Phishing Attack Types</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Phishing Emails:</strong> Fake emails designed to look like they are from a trusted organization.</li>
          <li><strong>Spear Phishing:</strong> Targeted phishing attacks aimed at specific individuals.</li>
          <li><strong>Smishing:</strong> Phishing attacks conducted via SMS (text messages).</li>
          <li><strong>Vishing:</strong> Phishing attacks conducted via phone calls.</li>
        </ul>
      </div>

      {/* Phishing Image Gallery Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Phishing Image Gallery</h2>

        {/* Image Gallery with Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-md overflow-hidden shadow-lg">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CC6YWbGR7x96nocYsgwiRrdqZKITE0lW1tSyG"
              alt="Phishing Email Netflix Example"
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openModal("https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4CC6YWbGR7x96nocYsgwiRrdqZKITE0lW1tSyG")}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">Phishing Email Example</h4>
              <p className="text-sm text-gray-600">A fake email designed to look legitimate to trick users into clicking a malicious link.</p>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden shadow-lg">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cu2DFVtG4mQUsoZpqaLvb91r76uKwfXVkOdTS"
              alt="Tiktok Phishing Email"
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openModal("https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cu2DFVtG4mQUsoZpqaLvb91r76uKwfXVkOdTS")}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">Fake Website</h4>
              <p className="text-sm text-gray-600">A fraudulent website that mimics a legitimate one to steal personal information.</p>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden shadow-lg">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cn5jjybUIOQkMxtCUhH2b49waNuPrmBjgF7v1"
              alt="Suspicious Link"
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openModal("https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4Cn5jjybUIOQkMxtCUhH2b49waNuPrmBjgF7v1")}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">Suspicious Link</h4>
              <p className="text-sm text-gray-600">A hyperlink in an email or message that leads to a malicious website.</p>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden shadow-lg">
            <img
              src="https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C8RgUI84yb5tRgalKN6MzFYu124VDsm3ykTqf"
              alt="Doordash Phishing"
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => openModal("https://1cfmo2xx3e.ufs.sh/f/78coIuOcAo4C8RgUI84yb5tRgalKN6MzFYu124VDsm3ykTqf")}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">Phishing SMS</h4>
              <p className="text-sm text-gray-600">An SMS that attempts to deceive users into revealing sensitive data.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-0 right-0 text-white text-2xl p-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Enlarged Phishing Example"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
