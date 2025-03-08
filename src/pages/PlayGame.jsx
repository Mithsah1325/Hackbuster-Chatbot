import React, { useState, useEffect } from 'react';

const PlayGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [gameState, setGameState] = useState('start'); // start, playing, end
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const [emailsPlayed, setEmailsPlayed] = useState(0);

  // Collection of phishing and legitimate emails
  const emails = [
    {
      id: 1,
      sender: 'accounts@paypa1.com',
      subject: 'Your account has been locked',
      body: 'Dear valued customer, we have detected suspicious activity on your account. Click here to verify your identity and restore access.',
      isPhishing: true,
      clues: ['The sender email uses a "1" instead of an "l"', 'Creates urgency', 'Generic greeting', 'No specific account details'],
      difficulty: 'easy'
    },
    {
      id: 2,
      sender: 'support@amazon.com',
      subject: 'Your recent Amazon order #A28756',
      body: 'Thank you for your recent purchase. Your order has been shipped and will arrive on March 9th. Track your package using your Amazon account.',
      isPhishing: false,
      clues: ['Legitimate sender email', 'Specific order number', 'No urgent request', 'No suspicious links'],
      difficulty: 'easy'
    },
    {
      id: 3,
      sender: 'securityteam@bankofamerica-secure.net',
      subject: 'URGENT: Security Breach Detected',
      body: 'We have detected unauthorized access to your account. Please verify your identity immediately by providing your username, password, and SSN by replying to this email.',
      isPhishing: true,
      clues: ['Bank would never ask for full credentials via email', 'Suspicious domain name', 'Creates extreme urgency', 'Asks for sensitive information'],
      difficulty: 'medium'
    },

    {
      id: 6,
      sender: 'newsletter@linkedin.com',
      subject: 'Your LinkedIn weekly update',
      body: 'Here are your network updates for this week: 5 new connections have posted updates, 3 jobs that might interest you, and 2 industry articles we recommend.',
      isPhishing: false,
      clues: ['Legitimate LinkedIn domain', 'Regular newsletter format', 'No urgent requests', 'Informational content only'],
      difficulty: 'easy'
    },
    {
      id: 7,
      sender: 'irs.tax.refund@irs-gov.org',
      subject: 'IRS: Tax Refund Available',
      body: 'After the last annual calculations, we found that you are eligible for a refund of $820.50. To claim your refund, please fill out the form with your bank details and SSN.',
      isPhishing: true,
      clues: ['IRS never initiates contact via email about refunds', 'Wrong domain (not .gov)', 'Asking for bank details and SSN', 'Unsolicited refund notification'],
      difficulty: 'medium'
    },
    {
      id: 8,
      sender: 'reservations@marriott.com',
      subject: 'Your stay at Marriott: Reservation confirmation',
      body: 'Thank you for choosing Marriott Hotels. Your reservation #MH29384756 for March 15-17, 2025 is confirmed. You can manage your reservation through our website or mobile app.',
      isPhishing: false,
      clues: ['Legitimate domain', 'Specific reservation details', 'No request for information', 'Provides official channels for follow-up'],
      difficulty: 'hard'
    }
  ];

  // Reset the game
  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
    setEmailsPlayed(0);
    getNextEmail();
    setTimeLeft(30);
  };

  // Get next email based on difficulty
  const getNextEmail = () => {
    const filteredEmails = emails.filter(email => 
      (difficulty === 'all' || email.difficulty === difficulty) && 
      (currentEmail === null || email.id !== currentEmail.id)
    );
    
    if (filteredEmails.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredEmails.length);
      setCurrentEmail(filteredEmails[randomIndex]);
      setEmailsPlayed(prev => prev + 1);
      setFeedback('');
      setTimeLeft(30);
    } else {
      // If no more emails match criteria, end game
      setGameState('end');
    }
  };

  // Handle user judgment
  const handleJudgment = (judgment) => {
    if (currentEmail.isPhishing === judgment) {
      // Correct judgment
      setScore(score + 100);
      setFeedback('Correct! Good job spotting this ' + (judgment ? 'phishing attempt!' : 'legitimate email!'));
    } else {
      // Incorrect judgment
      setLives(lives - 1);
      setFeedback('Sorry, that was ' + (currentEmail.isPhishing ? 'a phishing email!' : 'actually legitimate!'));
    }
    
    // Check if game should end
    if (lives <= 1 && currentEmail.isPhishing !== judgment) {
      setTimeout(() => setGameState('end'), 2000);
    } else if (emailsPlayed >= 7) {
      setTimeout(() => setGameState('end'), 2000);
    } else {
      setTimeout(getNextEmail, 2000);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setLives(lives - 1);
      setFeedback(`Time's up! That was ${currentEmail.isPhishing ? 'a phishing email!' : 'a legitimate email!'}`);
      
      if (lives <= 1) {
        setTimeout(() => setGameState('end'), 2000);
      } else {
        setTimeout(getNextEmail, 2000);
      }
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  // Render different game states
  if (gameState === 'start') {
    return (
      <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Phishing Simulator</h1>
        <p className="text-lg mb-4">Learn to identify phishing attempts in this interactive game. Examine each email carefully and decide if it's legitimate or a phishing attempt.</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Choose difficulty:</h2>
          <div className="flex justify-center gap-4">
            <button 
              className={`px-4 py-2 rounded-lg ${difficulty === 'easy' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${difficulty === 'medium' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${difficulty === 'hard' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setDifficulty('hard')}
            >
              Hard
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${difficulty === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setDifficulty('all')}
            >
              All Levels
            </button>
          </div>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Tips for spotting phishing:</h2>
          <ul className="list-disc pl-5">
            <li>Check sender email addresses carefully</li>
            <li>Be suspicious of urgent requests</li>
            <li>Watch for poor grammar and spelling</li>
            <li>Be wary of requests for personal information</li>
            <li>Hover over links before clicking (in real life)</li>
          </ul>
        </div>
        
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-bold hover:bg-blue-700 transition"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    );
  }
  
  if (gameState === 'playing' && currentEmail) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Score: {score}</div>
          <div className="text-lg font-semibold">Lives: {'❤️'.repeat(lives)}</div>
          <div className={`text-lg font-semibold ${timeLeft < 10 ? 'text-red-600' : ''}`}>Time: {timeLeft}s</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="border-b pb-2 mb-2">
            <div><strong>From:</strong> {currentEmail.sender}</div>
            <div><strong>Subject:</strong> {currentEmail.subject}</div>
          </div>
          <div className="min-h-32 mb-4">
            {currentEmail.body}
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <button
            className="flex-1 bg-red-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-red-600 transition"
            onClick={() => handleJudgment(true)}
          >
            Phishing Attempt!
          </button>
          <button
            className="flex-1 bg-green-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition"
            onClick={() => handleJudgment(false)}
          >
            Legitimate Email
          </button>
        </div>
        
        {feedback && (
          <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-bold mb-2">{feedback}</p>
            {feedback && (
              <div>
                <p className="font-semibold">Clues to look for:</p>
                <ul className="list-disc pl-5">
                  {currentEmail.clues.map((clue, index) => (
                    <li key={index}>{clue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  if (gameState === 'end') {
    return (
      <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Game Over</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">Your Results</h2>
          <div className="text-center text-5xl font-bold text-blue-600 mb-6">{score}</div>
          
          <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div>
              <p className="text-gray-600">Emails Analyzed</p>
              <p className="text-2xl font-bold">{emailsPlayed}</p>
            </div>
            <div>
              <p className="text-gray-600">Difficulty</p>
              <p className="text-2xl font-bold capitalize">{difficulty}</p>
            </div>
          </div>
          
          <div className="mb-6">
  <p className="text-center font-semibold text-lg">
    {score <= 200 ? 'Keep practicing! Phishing can be tricky to spot.' : 
     score <= 500 ? 'Good job! You\'re developing a keen eye for suspicious emails.' :
     'Excellent! You\'re a phishing detection expert!'}
  </p>
</div>
        </div>
        
        <div className="flex gap-4">
          <button
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
            onClick={() => setGameState('start')}
          >
            Play Again
          </button>
          <button
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-gray-700 transition"
            onClick={() => window.location.reload()}
          >
            Reset Game
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default PlayGame;