import React from 'react'
import { useUser } from '../context/UserContext'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Rewards = () => {
  const navigate = useNavigate()
  const { rewards } = useUser()
  const { darkMode } = useTheme()

  const rewardConfig = {
    book: {
      icon: '📖',
      name: 'Books',
      description: 'New reading material for your frog',
      color: 'from-blue-400 to-blue-600',
    },
    coffee: {
      icon: '☕',
      name: 'Coffee Styles',
      description: 'Different beverages for break time',
      color: 'from-yellow-400 to-amber-600',
    },
    background: {
      icon: '🌲',
      name: 'Backgrounds',
      description: 'Beautiful nature environments',
      color: 'from-green-400 to-emerald-600',
    },
  }

  const groupedRewards = {
    book: rewards?.filter(r => r.type === 'book') || [],
    coffee: rewards?.filter(r => r.type === 'coffee') || [],
    background: rewards?.filter(r => r.type === 'background') || [],
  }

  const totalRewards = rewards?.length || 0

  return (
    <div className={`min-h-screen transition-colors duration-300 py-12 ${darkMode ? 'bg-[#0E1511]' : 'bg-slate-50'}`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className={`p-3 rounded-2xl transition-all border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-600 shadow-sm'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold font-poppins" style={{ color: 'var(--text-main)' }}>Rewards</h1>
        </div>

        {/* Total Rewards */}
        <div className={`rounded-3xl p-8 mb-8 border text-center relative overflow-hidden ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[var(--primary)]/10 shadow-xl shadow-slate-200/50'}`}>
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary)] to-transparent" />
          <div className="relative z-10">
            <p className="text-5xl font-black mb-2" style={{ color: 'var(--primary)' }}>{totalRewards}</p>
            <p className="text-lg font-bold">Total Rewards Earned</p>
            <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">Keep studying to unlock more! 🏆</p>
          </div>
        </div>

        {/* Reward Categories */}
        <div className="space-y-8">
          {Object.entries(groupedRewards).map(([type, typeRewards]) => {
            const config = rewardConfig[type]
            return (
              <div key={type} className={`rounded-3xl p-8 shadow-xl border ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg bg-gradient-to-br ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold leading-tight">{config.name}</h2>
                    <p className="text-xs text-gray-500 font-medium">{config.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>{typeRewards.length}</span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">unlocked</p>
                  </div>
                </div>

                {typeRewards.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {typeRewards.map((reward) => (
                      <div
                        key={reward.id}
                        className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}
                      >
                        <div className="text-2xl mb-3">{config.icon}</div>
                        <p className="font-bold text-sm truncate">{reward.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">
                          {new Date(reward.unlocked_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-10 rounded-2xl border-2 border-dashed ${darkMode ? 'border-white/5 text-white/20' : 'border-slate-100 text-slate-300'}`}>
                    <p className="font-bold">No {type}s unlocked yet</p>
                    <p className="text-[10px] uppercase tracking-widest mt-1">Start a study session 🐸</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Achievements Section */}
        <div className={`mt-8 rounded-3xl p-8 border mb-20 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[var(--bg-soft)] border-[var(--primary)]/10'}`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>🌟</span>
            Achievements
          </h3>
          <div className="space-y-4">
            {[
              { id: 'streak3', label: '3-Day Streak', icon: '🔥', target: 3 },
              { id: 'streak7', label: '7-Day Streak', icon: '🏆', target: 7 },
              { id: 'rewards10', label: '10 Rewards', icon: '💎', target: 10 }
            ].map((ach) => {
              const currentTotal = rewards?.length || 0
              const isComplete = ach.id === 'rewards10' ? currentTotal >= ach.target : false // Simple check for now
              return (
                <div key={ach.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-white/50 shadow-sm'}`}>
                  <span className="text-2xl">{ach.icon}</span>
                  <span className="font-bold text-sm flex-1">{ach.label}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm ${isComplete ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {isComplete ? '✓' : '○'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rewards
