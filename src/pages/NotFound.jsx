import { Link } from 'react-router-dom'
import OrbBackground from '../components/ui/OrbBackground'
import { LogoFull } from '../components/ui/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-6">
      <OrbBackground />
      <div className="relative z-10 text-center">
        <LogoFull className="h-12 mx-auto mb-8" />
        <div className="font-sora font-black text-8xl mb-4" style={{ color: '#012BAA' }}>404</div>
        <h1 className="font-sora font-bold text-2xl text-slate-800 mb-3">Page not found</h1>
        <p className="font-dm text-slate-500 mb-8">
          This page doesn't exist. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="font-sora font-bold text-white px-8 py-3 rounded-full inline-flex"
          style={{ background: '#012BAA', boxShadow: '0 6px 20px rgba(1,43,170,0.35)' }}
        >
          Back to Home →
        </Link>
      </div>
    </div>
  )
}