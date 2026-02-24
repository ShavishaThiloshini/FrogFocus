import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [sessions, setSessions] = useState([])
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          await loadUserData(session.user.id)
        } else {
          // Anonymous login
          const { data: { user: anonUser }, error } = await supabase.auth.signInAnonymously()
          if (error) throw error
          setUser(anonUser)
          await loadUserData(anonUser.id)
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const loadUserData = async (userId) => {
    try {
      // Get user stats
      const { data: stats, error: statsError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (statsError && statsError.code !== 'PGRST116') throw statsError

      setUserStats(stats || {
        id: userId,
        created_at: new Date().toISOString(),
        total_minutes: 0,
        current_streak: 0,
        last_study_date: null,
      })

      // Get study sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('study_date', { ascending: false })

      if (sessionsError) throw sessionsError
      setSessions(sessionsData || [])

      // Get rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', userId)

      if (rewardsError) throw rewardsError
      setRewards(rewardsData || [])
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const signUpWithEmail = async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name
          }
        }
      })
      if (error) throw error

      // Upsert to users table to ensure name is stored
      if (data.user) {
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            display_name: name,
            total_minutes: 0,
            current_streak: 0
          })
        if (upsertError) console.warn('Error upserting user stats:', upsertError)
      }

      setUser(data.user)
      await loadUserData(data.user.id)
      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      setUser(data.user)
      await loadUserData(data.user.id)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setUserStats(null)
      setSessions([])
      setRewards([])
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const refreshUserData = async () => {
    if (user) {
      await loadUserData(user.id)
    }
  }

  const value = {
    user,
    userStats,
    sessions,
    rewards,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    refreshUserData,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
