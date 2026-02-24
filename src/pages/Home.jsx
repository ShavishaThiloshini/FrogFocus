import React, { useState } from 'react'
import { useTimer } from '../context/TimerContext'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabase'
import Timer from '../components/Timer'
import Frog from '../components/Frog'
import RewardModal from '../components/RewardModal'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { timeLeft, completeSession } = useTimer()
  const { user, userStats, rewards, refreshUserData } = useUser()
  const { darkMode } = useTheme()
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [newReward, setNewReward] = useState(null)

  const handleSessionComplete = async () => {
    if (user) {
      try {
        const result = await completeSession(user.id)
        if (result?.earned) {
          const rewardTypes = ['book', 'coffee', 'background']
          const randomType = rewardTypes[Math.floor(Math.random() * rewardTypes.length)]
          const { error: rewardError } = await supabase.from('rewards').insert([{
            user_id: user.id,
            type: randomType,
            name: `Reward ${rewards.length + 1}`,
            unlocked_at: new Date().toISOString(),
          }])
          if (!rewardError) {
            setNewReward({ type: randomType })
            setShowRewardModal(true)
          }
        }
        await refreshUserData()
      } catch (error) {
        console.error('Error during session completion:', error)
      }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${darkMode ? 'bg-[#0E1511]' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col min-h-screen">
        {/* Minimalist Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black font-poppins tracking-tighter" style={{ color: 'var(--text-main)' }}>
              Frog<span className="italic" style={{ color: 'var(--primary)' }}>Focus</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-60" style={{ color: 'var(--primary)' }}>
              Premium Focus Environment
            </p>
          </div>

          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-lg font-bold leading-none" style={{ color: 'var(--text-main)' }}>{userStats?.total_minutes || 0}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-40" style={{ color: 'var(--text-main)' }}>Minutes</p>
            </div>
            <div className={`w-px h-8 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className="text-right">
              <p className="text-lg font-bold text-amber-500 leading-none">{userStats?.current_streak || 0}</p>
              <p className="text-[9px] text-amber-500/50 font-bold uppercase tracking-widest mt-1">Streak</p>
            </div>
          </div>
        </div>

        {/* Integrated Focus Hub - Transparent HUD Layout */}
        <div className="flex-1 flex flex-col justify-center items-center relative mb-12">
          {/* Main Visual Container */}
          <div className={`relative w-full aspect-[4/5] md:aspect-video max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl border bg-black ${darkMode ? 'border-white/5 shadow-black/40' : 'border-slate-100'}`}>
            {/* Background Frog Companion */}
            <Frog />

            {/* HUD Timer - Positioned at Bottom */}
            <div className="absolute inset-x-0 bottom-0 z-20">
              <Timer onSessionComplete={handleSessionComplete} />
            </div>

            {/* Subtle Gradient Shadow at bottom for timer readability */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
          </div>

          {/* User & Reward Pill */}
          <div className="mt-8 flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest border shadow-sm transition-colors duration-300 ${darkMode ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[var(--bg-soft)] border-[var(--primary)] text-[var(--text-main)] opacity-80'}`}
              style={{ backgroundColor: !darkMode ? 'var(--bg-soft)' : undefined, borderColor: !darkMode ? 'var(--primary)' : undefined, color: !darkMode ? 'var(--text-main)' : undefined }}>
              {userStats?.display_name || user?.user_metadata?.display_name || 'Focuser'}
            </div>
            <div className="bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span>🎁</span>
              <span>{rewards?.length || 0} Rewards</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="text-center mt-auto py-6">
          <p className={`${darkMode ? 'text-white/10' : 'text-slate-300'} text-[9px] font-bold uppercase tracking-[0.4em]`}>
            Nature Harmony Productivity Engine
          </p>
        </div>
      </div>

      {/* Reward Modal */}
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => {
          setShowRewardModal(false)
          setNewReward(null)
        }}
        rewards={rewards}
        newReward={newReward}
      />
    </div>
  )
}

export default Home
