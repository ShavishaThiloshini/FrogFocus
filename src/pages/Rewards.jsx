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
    <div className={`min-h-screen transition-colors duration-300 py-10 ${darkMode ? 'bg-[#0E1511]' : 'bg-slate-50'}`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className={`p-2.5 rounded-xl transition-all border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-600 shadow-sm'}`}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--text-main)' }}>Rewards</h1>
        </div>

        {/* Total Rewards */}
        <div className={`rounded-[1.5rem] p-6 mb-6 border text-center relative overflow-hidden ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[var(--primary)]/10 shadow-lg shadow-slate-200/40'}`}>
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary)] to-transparent" />
          <div className="relative z-10 flex items-center justify-center gap-6">
            <div className="text-left leading-tight">
              <p className="text-4xl font-black" style={{ color: 'var(--primary)' }}>{totalRewards}</p>
              <p className="text-sm font-bold opacity-80">Total Rewards</p>
            </div>
            <div className={`w-px h-10 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold max-w-[140px] leading-relaxed">
              Keep studying to unlock more! 🏆
            </p>
          </div>
        </div>

        {/* Reward Categories */}
        <div className="space-y-6">
          {Object.entries(groupedRewards).map(([type, typeRewards]) => {
            const config = rewardConfig[type]
            return (
              <div key={type} className={`rounded-[1.5rem] p-6 shadow-lg border ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-slate-100 shadow-slate-200/40'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md bg-gradient-to-br ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold leading-tight">{config.name}</h2>
                    <p className="text-[10px] text-gray-500 font-medium">{config.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black" style={{ color: 'var(--text-main)' }}>{typeRewards.length}</span>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest -mt-1">unlocked</p>
                  </div>
                </div>

                {typeRewards.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {typeRewards.map((reward) => (
                      <div
                        key={reward.id}
                        className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}
                      >
                        <div className="text-xl mb-2">{config.icon}</div>
                        <p className="font-bold text-xs truncate">{reward.name}</p>
                        <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                          {new Date(reward.unlocked_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 rounded-xl border-2 border-dashed ${darkMode ? 'border-white/5 text-white/10' : 'border-slate-100/50 text-slate-300'}`}>
                    <p className="text-xs font-bold">Locked</p>
                    <p className="text-[8px] uppercase tracking-widest mt-1 opacity-60">Complete sessions to unlock</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Achievements Section */}
        <div className={`mt-6 rounded-[1.5rem] p-6 border mb-12 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[var(--bg-soft)] border-[var(--primary)]/10 shadow-sm'}`}>
          <h3 className="text-md font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>🌟</span>
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'streak3', label: '3-Day Streak', icon: '🔥', target: 3 },
              { id: 'streak7', label: '7-Day Streak', icon: '🏆', target: 7 },
              { id: 'rewards10', label: '10 Rewards', icon: '💎', target: 10 }
            ].map((ach) => {
              const currentTotal = rewards?.length || 0
              const isComplete = ach.id === 'rewards10' ? currentTotal >= ach.target : false // Simple check for now
              return (
                <div key={ach.id} className={`flex items-center gap-3 p-3 rounded-xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white/80 border-white/50 shadow-sm'}`}>
                  <span className="text-xl">{ach.icon}</span>
                  <span className="font-bold text-[11px] flex-1 truncate">{ach.label}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm ${isComplete ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
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
