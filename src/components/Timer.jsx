import React, { useState } from 'react'
import { useTimer } from '../context/TimerContext'
import { useUser } from '../context/UserContext'
import { Play, Pause, RotateCcw } from 'lucide-react'

const Timer = ({ onSessionComplete }) => {
  const {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    setDuration,
    isBreak,
    isManualBreak,
    startBreak,
    manualEndSession,
    sessionGoal,
    currentStage
  } = useTimer()
  const { user } = useUser()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const durations = [25, 45, 60]

  const handleManualEnd = async () => {
    if (onSessionComplete) {
      const result = await manualEndSession(user?.id)
      if (result?.earned) {
        onSessionComplete()
      } else if (result?.tooShort) {
        alert('Session too short! Only study sessions over 10 minutes are recorded. 🐸')
      }
    }
  }

  return (
    <div className="w-full flex items-end justify-center px-6 pb-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Goal Selector - Floating Pill */}
        {!isRunning && timeLeft === (sessionGoal === 25 ? 15 * 60 : sessionGoal === 45 ? 15 * 60 : 15 * 60) && currentStage?.type === 'study' ? (
          <div className="flex gap-2 mb-4 bg-white/10 hover:bg-white/20 p-1 rounded-full backdrop-blur-sm border border-white/10 transition-colors">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${sessionGoal === d
                  ? 'bg-emerald-500 text-white'
                  : 'text-white/60 hover:text-white/90'}`}
              >
                {d}m
              </button>
            ))}
          </div>
        ) : (
          <div className="h-4 mb-4" />
        )}

        {/* Minimalist HUD Controls */}
        <div className="w-full flex items-center justify-between gap-8 md:gap-12">
          {/* Left: Progress & Status */}
          <div className="flex-1 hidden md:block">
            <h2 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] drop-shadow-md mb-2">
              {isBreak || isManualBreak ? 'Resting ☕' : 'Focusing ⚡'}
            </h2>
            <div className="h-0.5 w-32 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-1000 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                style={{ width: `${(timeLeft / (currentStage?.duration || 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Center: Time & Primary Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className={`text-6xl md:text-7xl font-black tabular-nums tracking-tighter drop-shadow-xl transition-colors duration-500 ${isBreak || isManualBreak ? 'text-amber-300' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={startBreak}
                disabled={!isRunning && !isManualBreak}
                className={`p-2 transition-all duration-300 ${isManualBreak ? 'text-amber-300 scale-110' : 'text-white/40 hover:text-white disabled:opacity-0'}`}
                title="Take a break"
              >
                <span className="text-xl">☕</span>
              </button>

              <button
                onClick={isRunning ? pauseTimer : startTimer}
                className="w-14 h-14 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-90"
              >
                {isRunning ? (
                  <Pause size={24} fill="currentColor" />
                ) : (
                  <Play size={24} fill="currentColor" className="ml-1" />
                )}
              </button>

              <button
                onClick={handleManualEnd}
                disabled={!isRunning && timeLeft > 0}
                className="p-2 text-white/40 hover:text-red-400 transition-all duration-300 disabled:opacity-0"
                title="End session"
              >
                <span className="text-xl">🏁</span>
              </button>
            </div>
          </div>

          {/* Right: Stage Info */}
          <div className="flex-1 hidden md:flex flex-col items-end text-right">
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Current Session</p>
            <p className="text-xs font-bold text-white/80 drop-shadow-md">
              {sessionGoal}min Focus
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer
