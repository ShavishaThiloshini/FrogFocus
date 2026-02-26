import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { TimerProvider } from './context/TimerContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Home from './pages/Home'
import Progress from './pages/Progress'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navigation from './components/Navigation'

function AppContent() {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen font-poppins transition-colors duration-300 ${darkMode ? 'bg-[#0E1511] text-white' : 'bg-white text-[#1A2E25]'}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Navigation />
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <UserProvider>
          <TimerProvider>
            <AppContent />
          </TimerProvider>
        </UserProvider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
