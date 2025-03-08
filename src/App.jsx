import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Chatbot from './pages/Chatbot'
import PlayGame from './pages/PlayGame'
import Home from './pages/Home'
import Learn from './pages/Learn'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/playgame" element={<PlayGame />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  )
}

export default App
