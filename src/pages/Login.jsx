import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoFull } from '../components/ui/Logo'
import OrbBackground from '../components/ui/OrbBackground'
import useAuthStore from '../store/authStore'
import useExamStore from '../store/examStore'
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../lib/supabase'
import toast from 'react-hot-toast'
// Добавим иконки для полей ввода
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react'

const GOALS = [
  { id: 'sat', icon: '📊', label: 'SAT Preparation', sub: 'Target score 1400–1600 on the Digital SAT' },
  { id: 'ielts', icon: '🌍', label: 'IELTS Preparation', sub: 'Target band 7.0–9.0 on Academic or General' },
  { id: 'both', icon: '⚡', label: 'Both SAT & IELTS', sub: 'Preparing for multiple international exams' },
]

export default function Login() {
  const [tab, setTab] = useState('login')       // 'login' | 'signup'
  const [step, setStep] = useState(1)           // signup: 1=form, 2=goal
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [loading, setLoading] = useState(false)

  const { setUser } = useAuthStore()
  const { setGoal, setExam } = useExamStore()
  const navigate = useNavigate()

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle()
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    const { data, error } = await signInWithEmail(email, password)
    setLoading(false)
    if (error) { toast.error(error.message); return }
    setUser(data.user)
    toast.success('Welcome back!')
    navigate('/dashboard')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!email || !password || !name) { toast.error('Please fill in all fields'); return }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setStep(2)
  }

  const handleGoalSelect = async () => {
    if (!selectedGoal) { toast.error('Please choose your goal'); return }
    setLoading(true)
    const { data, error } = await signUpWithEmail(email, password)
    setLoading(false)
    if (error) { toast.error(error.message); return }
    setUser(data.user)
    setGoal(selectedGoal)
    setExam(selectedGoal === 'ielts' ? 'ielts' : 'sat')
    toast.success('Account created! Welcome to Prepify 🎉')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-[#001946]">
      <OrbBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px] border shadow-[0_30px_90px_rgba(0,0,0,0.4)]"
        style={{
          background: 'var(--bg-nav)', // Исправлено: теперь фон виден четко
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border-nav)',
          borderRadius: 48,
          padding: '48px 40px',
        }}
      >
        {/* TOP ROW: Icon + Logo (Right Side) */}
        <div className="flex items-start justify-between mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #012BAA, #2d52d4)',
              boxShadow: '0 8px 24px rgba(1,43,170,0.35)',
            }}
          >
            {step === 2 ? '🎯' : '✨'}
          </div>
          
          {/* Логотип перенесен сюда (на правую сторону внутри карточки) */}
          <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <LogoFull className="h-8" />
          </Link>
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-full p-1.5 mb-8 transition-all"
          style={{ background: 'var(--bg-pill)' }}
        >
          {['login', 'signup'].map((t) => (
            <button
              key={t}
              disabled={step === 2}
              onClick={() => { setTab(t); setStep(1) }}
              className={`flex-1 py-2.5 rounded-full text-sm font-sora font-bold transition-all duration-300 ${
                tab === t 
                ? 'bg-white text-[#001946] shadow-md' 
                : 'text-slate-400 hover:text-white disabled:opacity-30'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── LOGIN ── */}
          {tab === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}
            >
              <h2 className="font-sora font-black text-3xl text-white mb-2">Welcome Back</h2>
              <p className="font-dm text-sm text-slate-400 mb-8">Sign in to your Prepify account</p>

              <GoogleButton onClick={handleGoogleAuth} label="Continue with Google" />
              <Divider />

              <form onSubmit={handleLogin} className="space-y-6">
                <InputField 
                  label="EMAIL ADDRESS"
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon={Mail}
                />
                <div>
                  <InputField 
                    label="PASSWORD"
                    type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    icon={Lock}
                  />
                  <div className="flex justify-end mt-2">
                    <a href="#" className="font-sora text-[11px] font-bold text-blue-500 hover:text-blue-400 transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <SubmitButton loading={loading} label="Sign In →" />
              </form>

              <p className="text-center font-dm text-sm text-slate-500 mt-8">
                New to Prepify?{' '}
                <button onClick={() => setTab('signup')} className="font-bold text-blue-400 hover:text-blue-300">
                  Create Account
                </button>
              </p>
            </motion.div>
          )}

          {/* ── SIGNUP STEP 1 ── */}
          {tab === 'signup' && step === 1 && (
            <motion.div
              key="signup1"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}
            >
              <h2 className="font-sora font-black text-3xl text-white mb-2">Create Account</h2>
              <p className="font-dm text-sm text-slate-400 mb-8">Join 1,000+ students worldwide</p>

              <GoogleButton onClick={handleGoogleAuth} label="Sign up with Google" />
              <Divider />

              <form onSubmit={handleSignup} className="space-y-5">
                <InputField 
                  label="FULL NAME"
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  icon={User}
                />
                <InputField 
                  label="EMAIL ADDRESS"
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon={Mail}
                />
                <InputField 
                  label="PASSWORD"
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  icon={Lock}
                />
                <SubmitButton loading={false} label="Continue →" />
              </form>

              <p className="text-center font-dm text-sm text-slate-500 mt-8">
                Already have an account?{' '}
                <button onClick={() => setTab('login')} className="font-bold text-blue-400 hover:text-blue-300">
                  Sign In
                </button>
              </p>
            </motion.div>
          )}

          {/* ── SIGNUP STEP 2 — Goal Selection ── */}
          {tab === 'signup' && step === 2 && (
            <motion.div
              key="signup2"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="font-sora font-black text-2xl text-white mb-2">Choose Your Goal</h2>
                <p className="font-dm text-sm text-slate-400">
                  This personalizes your AI study plan
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                {GOALS.map((g) => (
                  <motion.div
                    key={g.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all border-2 ${
                      selectedGoal === g.id 
                      ? 'bg-blue-600/10 border-blue-500' 
                      : 'bg-[#ffffff05] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div className="flex-1">
                      <div className="font-sora text-sm font-bold text-white">{g.label}</div>
                      <div className="font-dm text-xs text-slate-500 mt-0.5">{g.sub}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedGoal === g.id ? 'bg-blue-500 text-white' : 'border border-slate-700'
                    }`}>
                      {selectedGoal === g.id && <CheckCircle2 size={14} />}
                    </div>
                  </motion.div>
                ))}
              </div>

              <SubmitButton loading={loading} label="Go to My Dashboard →" onClick={handleGoalSelect} />
              
              <button
                onClick={() => setStep(1)}
                className="w-full text-center font-sora text-xs font-bold text-slate-500 mt-4 hover:text-white transition-colors"
              >
                ← BACK TO DETAILS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ С НОВЫМИ СТИЛЯМИ ---

function InputField({ label, icon: Icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="block font-sora text-[10px] font-bold text-slate-500 tracking-[0.1em] px-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors">
          <Icon size={18} />
        </div>
        <input
          {...props}
          className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm text-white placeholder:text-slate-600 outline-none transition-all border border-white/5 focus:border-blue-500/50"
          style={{ background: 'var(--bg-pill)' }}
        />
      </div>
    </div>
  )
}

function GoogleButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl font-sora text-sm font-bold text-[#001946] transition-all hover:scale-[1.02] active:scale-[0.98] bg-white shadow-lg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {label}
    </button>
  )
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-[1px] bg-white/10" />
      <span className="font-dm text-[10px] font-bold text-slate-600 uppercase tracking-widest">or email</span>
      <div className="flex-1 h-[1px] bg-white/10" />
    </div>
  )
}

function SubmitButton({ loading, label, onClick }) {
  return (
    <button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={loading}
      className="w-full py-4 rounded-2xl font-sora font-black text-white text-sm tracking-wide transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
      style={{
        background: 'linear-gradient(135deg, #012BAA, #2d52d4)',
        boxShadow: '0 10px 30px rgba(1,43,170,0.4)',
      }}
    >
      {loading ? 'Processing...' : label}
    </button>
  )
}