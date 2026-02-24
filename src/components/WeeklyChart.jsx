import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useTheme } from '../context/ThemeContext'

const WeeklyChart = ({ sessions }) => {
  const { darkMode } = useTheme()
  const weeklyData = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dayMap = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    }

    const data = days.map(day => ({ day, minutes: 0 }))

    // Get this week's sessions
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())

    sessions?.forEach(session => {
      const sessionDate = new Date(session.study_date)
      if (sessionDate >= startOfWeek && sessionDate <= today) {
        const dayIndex = sessionDate.getDay()
        const dayName = dayMap[dayIndex]
        const dayIdx = data.findIndex(d => d.day.toLowerCase().includes(dayName.toLowerCase()))
        if (dayIdx !== -1) {
          data[dayIdx].minutes += session.duration
        }
      }
    })

    return data
  }, [sessions])

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 100)
  const bestDay = weeklyData.reduce((best, current) =>
    current.minutes > best.minutes ? current : best
  )

  return (
    <div className={`w-full rounded-[2rem] p-8 shadow-xl border transition-all ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--bg-soft)', color: 'var(--primary)' }}>📊</span>
        This Week
      </h2>
      {bestDay.minutes > 0 ? (
        <p className="text-sm text-gray-400 mb-8 font-medium">
          Your most focused day was <span className="font-bold" style={{ color: 'var(--primary)' }}>{bestDay.day}</span>
        </p>
      ) : (
        <p className="text-sm text-gray-400 mb-8 font-medium italic">No focus sessions recorded this week yet.</p>
      )}

      <div className="h-[280px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fontWeight: 600, fill: darkMode ? 'rgba(255,255,255,0.3)' : '#94A3B8' }}
              tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 10, fontWeight: 600, fill: darkMode ? 'rgba(255,255,255,0.3)' : '#94A3B8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                backgroundColor: darkMode ? '#1E2923' : 'white',
                padding: '12px 16px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              itemStyle={{ color: 'var(--primary)' }}
              labelStyle={{ color: darkMode ? 'rgba(255,255,255,0.5)' : '#64748B', marginBottom: '4px' }}
              formatter={(value) => [`${value} min`, 'Focus Time']}
            />
            <Bar dataKey="minutes" radius={[6, 6, 6, 6]} barSize={32}>
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.minutes > 0 ? 'var(--primary)' : (darkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9')}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`mt-8 p-6 rounded-2xl flex items-center justify-between ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Focus Time</p>
          <p className="text-2xl font-black" style={{ color: 'var(--text-main)' }}>
            {weeklyData.reduce((sum, day) => sum + day.minutes, 0)} <span className="text-sm font-bold opacity-40">MIN</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner bg-white/5" style={{ color: 'var(--primary)' }}>
          ⏱️
        </div>
      </div>
    </div>
  )
}

export default WeeklyChart
