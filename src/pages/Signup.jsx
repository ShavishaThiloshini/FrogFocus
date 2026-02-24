import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { signUpWithEmail } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await signUpWithEmail(email, password, name)
        if (result.success) {
            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)
        } else {
            alert(result.error)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] p-4 font-poppins">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center max-w-md w-full border border-emerald-100">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1A2E25] mb-2">Welcome, {name}!</h2>
                    <p className="text-emerald-600 font-medium">Your account has been created.</p>
                    <p className="text-gray-400 mt-4 text-sm italic">Redirecting to your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] p-4 font-poppins">
            <div className="w-full max-w-md py-8">
                {/* Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-emerald-100 transform transition-all hover:shadow-2xl">
                    <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold text-[#1A2E25]">Join FrogFocus</h1>
                            <p className="text-emerald-600 mt-2 font-medium">Start your peak productivity era</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-[#1A2E25] ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500 group-focus-within:text-emerald-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-[#1A2E25] placeholder-emerald-300/60 focus:bg-white focus:border-emerald-400 focus:outline-none transition-all duration-200"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

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
                                <label className="text-sm font-semibold text-[#1A2E25] ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500 group-focus-within:text-emerald-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-[#1A2E25] placeholder-emerald-300/60 focus:bg-white focus:border-emerald-400 focus:outline-none transition-all duration-200"
                                        placeholder="Min. 8 characters"
                                        minLength={8}
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
                                        <span>Create Account</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-emerald-50 text-center">
                            <p className="text-gray-500 font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-emerald-600 font-bold hover:underline decoration-2 underline-offset-4">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
