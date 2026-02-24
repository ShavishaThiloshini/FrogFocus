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
    <div className={`min-h-screen transition-colors duration-300 py-12 px-4 mb-20 font-poppins ${darkMode ? 'bg-[#0E1511] text-white' : 'bg-slate-50 text-[#1A2E25]'}`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate('/')}
            className={`p-3 shadow-sm hover:shadow-md rounded-2xl transition-all border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-emerald-50 text-emerald-600'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className={`${darkMode ? 'text-white/40' : 'text-emerald-600'} text-sm font-medium`}>Manage your focus profile</p>
          </div>
        </div>

        {/* Appearance Section */}
        <div className={`rounded-[2rem] p-8 shadow-xl border mb-8 transition-transform hover:scale-[1.01] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-sm">✨</span>
            Appearance
          </h2>

          <div className="space-y-8">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="font-bold">Dark Mode</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-indigo-500' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className={`rounded-[2rem] p-8 shadow-xl border mb-8 transition-transform hover:scale-[1.01] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">👤</span>
              Profile
            </h2>
            {user?.email && (
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Authenticated
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-emerald-50/30 border-emerald-50'}`}>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Name</p>
                <p className="text-lg font-bold">
                  {userStats?.display_name || user?.user_metadata?.display_name || 'Anonymous User'}
                </p>
              </div>
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-emerald-50/30 border-emerald-50'}`}>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Email</p>
                <p className="text-gray-500 font-medium truncate">
                  {user?.email || 'No email provided'}
                </p>
              </div>
            </div>

            {user?.email ? (
              <button
                onClick={handleSignOut}
                className="w-full group flex items-center justify-center gap-3 p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold"
              >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                Sign Out from Account
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center px-4">
                  Sign in to sync your progress across devices and preserve your streaks.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all font-bold flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  Sign In to FrogFocus
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preferences Section */}
        <div className={`rounded-[2rem] p-8 shadow-xl border mb-8 transition-transform hover:scale-[1.01] ${darkMode ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white border-emerald-50 shadow-emerald-900/5'}`}>
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm">⚙️</span>
            Preferences
          </h2>

          <div className="space-y-4">
            {[
              { id: 'sound', label: 'Sound Effects', icon: '🔊' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'vibration', label: 'Vibration Feedback', icon: '📳' }
            ].map((pref) => (
              <div key={pref.id} className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{pref.icon}</span>
                  <label htmlFor={pref.id} className="font-bold">{pref.label}</label>
                </div>
                <input
                  type="checkbox"
                  id={pref.id}
                  defaultChecked={true}
                  className="w-5 h-5 rounded-lg accent-emerald-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className={`rounded-[2rem] p-8 shadow-xl border mb-20 transition-transform hover:scale-[1.01] ${darkMode ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/10' : 'bg-gradient-to-br from-emerald-50 to-transparent border-emerald-100'}`}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center text-sm">ℹ️</span>
            About
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Version</span>
              <span className="font-black">1.1.0</span>
            </div>
            <div className="pt-4 border-t border-emerald-500/10">
              <p className="text-sm font-medium">Created with 💚 for students</p>
              <p className="text-xs text-gray-500 mt-1">Focus. Track. Succeed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
