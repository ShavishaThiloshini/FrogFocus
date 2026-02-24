import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BarChart3, Gift, Settings, User } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'

const Navigation = () => {
  const location = useLocation()
  const { user } = useUser()
  const { darkMode } = useTheme()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/rewards', icon: Gift, label: 'Rewards' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  const isAuth = user && user.email

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 transition-colors duration-300 ${darkMode ? 'bg-[#0E1511] border-white/5 shadow-black/40' : 'bg-white border-slate-100'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-4 px-4 transition-all duration-300 relative ${isActive
                  ? 'text-[var(--primary)]'
                  : darkMode ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--primary)] rounded-b-full shadow-[0_0_10px_var(--primary)] opacity-80" />
                )}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}

          {!isAuth && (
            <Link
              to="/login"
              className={`flex flex-col items-center justify-center py-4 px-4 transition-all duration-300 relative ${location.pathname === '/login' || location.pathname === '/signup'
                ? 'text-[var(--primary)]'
                : darkMode ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {(location.pathname === '/login' || location.pathname === '/signup') && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--primary)] rounded-b-full shadow-[0_0_10px_var(--primary)] opacity-80" />
              )}
              <User size={22} strokeWidth={['/login', '/signup'].includes(location.pathname) ? 2.5 : 2} />
              <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${['/login', '/signup'].includes(location.pathname) ? 'opacity-100' : 'opacity-60'}`}>
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
