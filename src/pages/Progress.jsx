import React from 'react'
import { useUser } from '../context/UserContext'
import WeeklyChart from '../components/WeeklyChart'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Progress = () => {
  const navigate = useNavigate()
  const { sessions, userStats } = useUser()
  const { darkMode } = useTheme()

  const totalMinutes = userStats?.total_minutes || 0
  const totalSessions = sessions?.length || 0
  const averageMinutes = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0

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
          <h1 className="text-3xl font-bold font-poppins" style={{ color: 'var(--text-main)' }}>Progress</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Total Minutes', value: totalMinutes, color: 'var(--primary)' },
            { label: 'Sessions', value: totalSessions, color: '#F59E0B' },
            { label: 'Avg Per Session', value: averageMinutes, color: 'var(--primary)' },
            { label: 'Day Streak 🔥', value: userStats?.current_streak || 0, color: '#F59E0B' }
          ].map((stat, i) => (
            <div key={i} className={`rounded-3xl p-6 shadow-xl border transition-all hover:scale-[1.02] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-[var(--primary)]/5 shadow-slate-200/50'}`}>
              <p className="text-3xl font-black font-poppins" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold mt-2 opacity-40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="mb-8 p-1">
          <WeeklyChart sessions={sessions} />
        </div>

        {/* Recent Sessions */}
        <div className={`rounded-3xl p-8 shadow-xl border mb-20 ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--primary)' }}>📝</span>
            Recent Sessions
          </h2>

          {sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.slice(0, 10).map((session) => (
                <div
                  key={session.id}
                  className={`flex justify-between items-center p-5 rounded-2xl border transition-all hover:scale-[1.01] ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:border-[var(--primary)]'}`}
                >
                  <div>
                    <p className="font-bold">
                      {new Date(session.study_date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] mt-1">Study Session</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: 'var(--primary)' }}>{session.duration}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">minutes</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg font-medium">No study sessions yet. Start one today! 🐸</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Progress
