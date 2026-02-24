import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { LogIn, Mail, Lock, ArrowRight, Github } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { signInWithEmail } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await signInWithEmail(email, password)
        if (result.success) {
            navigate('/')
        } else {
            alert(result.error)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] p-4 font-poppins">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-emerald-100 transform transition-all hover:shadow-2xl">
                    <div className="p-8 md:p-12">
                        {/* Logo area */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-4 transition-transform hover:scale-110 hover:rotate-3 duration-300">
                                <span className="text-4xl">🐸</span>
                            </div>
                            <h1 className="text-3xl font-bold text-[#1A2E25]">Welcome Back</h1>
                            <p className="text-emerald-600 mt-2 font-medium">Continue your focus journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#1A2E25] ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500 group-focus-within:text-emerald-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-[#1A2E25] placeholder-emerald-300/60 focus:bg-white focus:border-emerald-400 focus:outline-none transition-all duration-200"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold text-[#1A2E25]">Password</label>
                                    <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500 group-focus-within:text-emerald-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-[#1A2E25] placeholder-emerald-300/60 focus:bg-white focus:border-emerald-400 focus:outline-none transition-all duration-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-4 group"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-emerald-50 text-center">
                            <p className="text-gray-500 font-medium">
                                New to FrogFocus?{' '}
                                <Link to="/signup" className="text-emerald-600 font-bold hover:underline decoration-2 underline-offset-4">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <p className="text-center text-sm text-gray-400 mt-8">
                    By signing in, you agree to our <a href="#" className="hover:text-emerald-500 underline">Terms</a> and <a href="#" className="hover:text-emerald-500 underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    )
}

export default Login
