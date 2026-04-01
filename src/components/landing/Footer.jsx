import { Link } from 'react-router-dom'
import { LogoFull } from '../ui/Logo'
import { Send, Instagram, Github } from 'lucide-react' // Modern icons

const LINKS = {
  Product: [
    { label: 'Question Bank', to: '/dashboard/question-bank' },
    { label: 'AI Study Planner', to: '/dashboard/planner' },
    { label: 'Full Mock Tests', to: '/dashboard/mocks' },
    { label: 'Score Predictor', to: '/dashboard/predictor' },
    { label: 'IELTS Writing', to: '/dashboard/ielts/writing' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const SOCIALS = [
  { label: 'Telegram', icon: <Send size={18} />, href: 'https://t.me/prepifyecosystem' },
  { label: 'Instagram', icon: <Instagram size={18} />, href: '#' },
  { label: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/zarifov77/Prepify' },
]

export default function Footer() {
  return (
    <footer
      className="relative z-10 px-6 pt-14 pb-8"
      style={{
        background: 'var(--bg-nav)', // Use same variable as Navbar
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderTop: '1px solid var(--border-nav)',
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <LogoFull className="h-10 mb-4" />
            <p className="font-dm text-sm text-slate-400 leading-relaxed max-w-[220px]">
              The ultimate SAT & IELTS preparation ecosystem. Built for students who refuse
              to settle for average.
            </p>
          </div>

          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-sora text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="font-dm text-sm text-slate-400 hover:text-[#012BAA] dark:hover:text-blue-400 transition-all"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="font-dm text-sm text-slate-400 hover:text-[#012BAA] dark:hover:text-blue-400 transition-all"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="font-dm text-xs text-slate-500">
            © 2026 Prepify. All rights reserved. SAT® is a registered trademark of College Board.
            IELTS® is a trademark of British Council.
          </p>

          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                style={{
                  background: 'var(--bg-pill)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#012BAA'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-pill)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}