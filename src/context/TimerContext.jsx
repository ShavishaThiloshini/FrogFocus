import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const TimerContext = createContext()

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(1500)
  const [sessionGoal, setSessionGoal] = useState(25) // 25, 45, or 60
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [isManualBreak, setIsManualBreak] = useState(false)
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [cumulativeStudyTime, setCumulativeStudyTime] = useState(0)
  const [preBreakTimeLeft, setPreBreakTimeLeft] = useState(null)

  // Generate session sequence based on goal
  const getSessionStages = (goal) => {
    if (goal === 25) {
      return [
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 10 * 60 }
      ]
    } else if (goal === 45) {
      return [
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 15 * 60 }
      ]
    } else if (goal === 60) {
      return [
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 15 * 60 },
        { type: 'break', duration: 5 * 60 },
        { type: 'study', duration: 15 * 60 }
      ]
    }
    return [{ type: 'study', duration: goal * 60 }]
  }

  const stages = getSessionStages(sessionGoal)

  useEffect(() => {
    let interval = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleStageComplete()
            return 0
          }
          return prev - 1
        })

        // Track study time if not in break
        if (!isBreak && !isManualBreak) {
          setCumulativeStudyTime(prev => prev + 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak, isManualBreak])

  const handleStageComplete = () => {
    const nextIndex = currentStageIndex + 1
    if (nextIndex < stages.length) {
      setCurrentStageIndex(nextIndex)
      const nextStage = stages[nextIndex]
      setTimeLeft(nextStage.duration)
      setIsBreak(nextStage.type === 'break')
    } else {
      setIsRunning(false)
      // Session finished naturally
    }
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = (goal = sessionGoal) => {
    const freshStages = getSessionStages(goal)
    setSessionGoal(goal)
    setCurrentStageIndex(0)
    setTimeLeft(freshStages[0].duration)
    setIsRunning(false)
    setIsBreak(false)
    setIsManualBreak(false)
    setCumulativeStudyTime(0)
    setPreBreakTimeLeft(null)
  }

  const setDuration = (minutes) => {
    resetTimer(minutes)
  }

  const startBreak = () => {
    if (isManualBreak) {
      // End manual break, resume study
      setTimeLeft(preBreakTimeLeft)
      setPreBreakTimeLeft(null)
      setIsManualBreak(false)
      setIsBreak(stages[currentStageIndex].type === 'break')
    } else {
      // Start manual break
      setPreBreakTimeLeft(timeLeft)
      setTimeLeft(5 * 60) // 5 minutes manual break
      setIsManualBreak(true)
      setIsBreak(true)
    }
  }

  const completeSession = async (userId) => {
    if (!userId) return { earned: false }

    const studyMinutes = Math.floor(cumulativeStudyTime / 60)

    // Minimum 10 minutes requirement
    if (studyMinutes < 10) {
      resetTimer(sessionGoal)
      return { earned: false, tooShort: true }
    }

    try {
      // Use existing robust saving logic from before
      const { data: userRecord } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      const today = new Date().toISOString().split('T')[0]
      const lastStudyDate = userRecord?.last_study_date
      let streak = userRecord?.current_streak || 0

      if (!lastStudyDate) streak = 1
      else if (lastStudyDate !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        streak = lastStudyDate === yesterday.toISOString().split('T')[0] ? streak + 1 : 1
      }

      await supabase.from('users').upsert({
        id: userId,
        total_minutes: (userRecord?.total_minutes || 0) + studyMinutes,
        current_streak: streak,
        last_study_date: today
      })

      const { data: session } = await supabase.from('study_sessions').insert([{
        user_id: userId,
        duration: studyMinutes,
        study_date: today,
      }]).select()

      resetTimer(sessionGoal)
      return { session, earned: true }
    } catch (error) {
      console.error('Error saving session:', error)
      resetTimer(sessionGoal)
      return { earned: false }
    }
  }

  const manualEndSession = async (userId) => {
    return await completeSession(userId)
  }

  const value = {
    timeLeft,
    sessionGoal,
    isRunning,
    isBreak,
    isManualBreak,
    startTimer,
    pauseTimer,
    resetTimer,
    setDuration,
    completeSession,
    startBreak,
    manualEndSession,
    cumulativeStudyTime,
    currentStage: stages[currentStageIndex]
  }

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  )
}

export const useTimer = () => {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider')
  }
  return context
}
