import { NavLink, useNavigate } from 'react-router-dom'
import { LogoFull } from './Logo'
import ExamCountdown from './ExamCountdown'
import useExamStore from '../../store/examStore'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

const SAT_LINKS = [
  { to: '/dashboard',                label: 'Home',              icon: '🏠', end: true },
  { to: '/dashboard/question-bank',  label: 'Question Bank',     icon: '📚' },
  { to: '/dashboard/question-rush',  label: 'Question Rush',     icon: '⚡', badge: 'New' },
  { to: '/dashboard/mocks',          label: 'Full-Length Tests',  icon: '📝' },
  { to: '/dashboard/planner',        label: 'Study Planner',     icon: '📅' },
  { to: '/dashboard/predictor',      label: 'Score Predictor',   icon: '🎯' },
]

const IELTS_LINKS = [
  { to: '/dashboard',                    label: 'Home',           icon: '🏠', end: true },
  { to: '/dashboard/ielts/listening',    label: 'Listening',      icon: '🎧' },
  { to: '/dashboard/ielts/reading',      label: 'Reading',        icon: '📖' },
  { to: '/dashboard/ielts/writing',      label: 'Writing',        icon: '✍️' },
  { to: '/dashboard/planner',            label: 'Study Planner',  icon: '📅' },
]

export default function Sidebar() {
  const { exam, setExam } = useExamStore()
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()
  const links = exam === 'sat' ? SAT_LINKS : IELTS_LINKS

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'JA'

  const displayName = user?.user_metadata?.full_name || 'Student'
  const plan = 'Elite Pro'

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col py-5 overflow-y-auto"
      style={{
        background: 'var(--sidebar-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderRight: '1px solid var(--sidebar-border)',
        boxShadow: '4px 0 24px rgba(0,25,70,0.06)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      {/* Logo */}
      <div className="px-5 mb-5">
        <LogoFull className="h-8 max-w-full" />
      </div>

      {/* SAT / IELTS Switcher */}
      <div
        className="mx-4 mb-4 flex rounded-2xl p-1"
        style={{
          background: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.65)',
        }}
      >
        {['sat', 'ielts'].map((e) => (
          <button
            key={e}
            onClick={() => setExam(e)}
            className="flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all"
            style={
              exam === e
                ? {
                    background: '#012BAA',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(1,43,170,0.30)',
                  }
                : { color: '#9ca3af' }
            }
          >
            {e === 'sat' ? 'SAT Prep' : 'IELTS Prep'}
          </button>
        ))}
      </div>

      {/* Countdown */}
      <ExamCountdown />

      {/* Nav section label */}
      <div className="px-5 mb-1">
        <span className="text-[10px] font-sora font-bold tracking-widest uppercase text-slate-400">
          {exam === 'sat' ? 'Practice' : 'Skills'}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
               font-sora text-sm font-semibold transition-all
               ${isActive
                 ? 'text-primary'
                 : 'text-slate-500 hover:text-slate-800'}`
            }
            style={({ isActive }) =>
              isActive
                ? { background: 'rgba(1,43,170,0.10)' }
                : {}
            }
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'rgba(0,0,0,0.05)' }}
            >
              {link.icon}
            </span>
            {link.label}
            {link.badge && (
              <span
                className="ml-auto text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#012BAA' }}
              >
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User row */}
      <div
        className="mx-3 mt-2 p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all group"
        style={{ borderTop: '1px solid rgba(255,255,255,0.60)' }}
        onClick={handleSignOut}
        title="Click to sign out"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center
                      font-sora font-bold text-white text-sm flex-shrink-0"
          style={{ background: '#012BAA' }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-sora text-sm font-bold text-slate-800 truncate">
            {displayName}
          </div>
          <div className="font-dm text-xs text-slate-400">{plan}</div>
        </div>
        <span className="text-slate-300 group-hover:text-slate-500 text-xs transition-all">↩</span>
      </div>
    </aside>
  )
}