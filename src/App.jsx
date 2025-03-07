import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Chatbot from './pages/Chatbot'
import PlayGame from './pages/PlayGame'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/playgame" element={<PlayGame />} />
      </Routes>
    </Router>
  )
}

export default App
