import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, LogIn, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const navigate = useNavigate()
  const { user, userStats, signOut } = useUser()
  const { darkMode, toggleDarkMode } = useTheme()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut()
      navigate('/')
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 py-10 px-4 mb-20 font-poppins ${darkMode ? 'bg-[#0E1511] text-white' : 'bg-slate-50 text-[#1A2E25]'}`}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className={`p-2.5 shadow-sm hover:shadow-md rounded-xl transition-all border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-emerald-50 text-emerald-600'}`}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className={`${darkMode ? 'text-white/40' : 'text-emerald-600'} text-[10px] font-bold uppercase tracking-widest`}>Manage Profile</p>
          </div>
        </div>

        {/* Appearance Section */}
        <div className={`rounded-[1.5rem] p-6 shadow-lg border mb-6 transition-transform hover:scale-[1.005] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-xs">✨</span>
            Appearance
          </h2>

          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                  {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                </div>
                <div>
                  <p className="font-bold text-sm">Dark Mode</p>
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest opacity-60">Visual Theme</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-indigo-500' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className={`rounded-[1.5rem] p-6 shadow-lg border mb-6 transition-transform hover:scale-[1.005] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs text-sm">👤</span>
              Profile
            </h2>
            {user?.email && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-wider rounded-full">
                Authenticated
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-emerald-50/30 border-emerald-50'}`}>
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">Name</p>
                <p className="font-bold text-sm truncate">
                  {userStats?.display_name || user?.user_metadata?.display_name || 'Anonymous'}
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-emerald-50/30 border-emerald-50'}`}>
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">Email</p>
                <p className="text-gray-500 font-medium text-xs truncate">
                  {user?.email || 'No email provided'}
                </p>
              </div>
            </div>

            {user?.email ? (
              <button
                onClick={handleSignOut}
                className="w-full group flex items-center justify-center gap-2 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] text-gray-500 text-center px-4">
                  Sign in to sync your progress and preserve streaks.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/10 transition-all font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className={`rounded-[1.5rem] p-6 shadow-lg border mb-6 transition-transform hover:scale-[1.005] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xs">⚙️</span>
            Preferences
          </h2>

          <div className="space-y-3">
            {[
              { id: 'sound', label: 'Sound Effects', icon: '🔊' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'vibration', label: 'Vibration Feedback', icon: '📳' }
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-md">{pref.icon}</span>
                  <label htmlFor={pref.id} className="font-bold text-sm">{pref.label}</label>
                </div>
                <input
                  type="checkbox"
                  id={pref.id}
                  defaultChecked={true}
                  className="w-4 h-4 rounded-lg accent-emerald-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className={`rounded-[1.5rem] p-6 shadow-lg border mb-12 transition-transform hover:scale-[1.005] ${darkMode ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/10' : 'bg-gradient-to-br from-emerald-50 to-transparent border-emerald-100'}`}>
          <h2 className="text-md font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-white/50 rounded-lg flex items-center justify-center text-xs text-sm">ℹ️</span>
            About
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-400 uppercase tracking-widest text-[9px]">Version</span>
              <span className="font-black">1.1.0</span>
            </div>
            <div className="pt-3 border-t border-emerald-500/10">
              <p className="text-xs font-medium">Created with 💚 for students</p>
              <p className="text-[10px] text-gray-400 mt-0.5 italic">Focus. Track. Succeed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
