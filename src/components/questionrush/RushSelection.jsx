import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const EBRW_TOPICS = [
  { label: 'Craft and Structure', count: 91 },
  { label: 'Text Structure & Purpose', count: 19 },
  { label: 'Words in Context', count: 48 },
  { label: 'Inference', count: 31 },
  { label: 'Central Ideas', count: 54 },
  { label: 'Command of Evidence', count: 47 },
  { label: 'Boundaries', count: 27 },
  { label: 'Form, Structure, Sense', count: 77 },
]

const MATH_TOPICS = [
  { label: 'Linear Equations', count: 65 },
  { label: 'Nonlinear Equations', count: 45 },
  { label: 'Functions', count: 27 },
  { label: 'Statistics', count: 38 },
  { label: 'Geometry', count: 45 },
  { label: 'Trigonometry', count: 38 },
]

const RECENT_SESSIONS = [
  { questions: 272, ago: '13 hours ago', correct: 225, wrong: 47, time: '2h 54m' },
  { questions: 79, ago: '3 hours ago', correct: 67, wrong: 12, time: '1h 44m' },
  { questions: 110, ago: '1 day ago', correct: 91, wrong: 19, time: '2h 11m' },
]

export default function RushSelection() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set(['Craft and Structure']))

  const toggle = (label) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  const totalQ = [...EBRW_TOPICS, ...MATH_TOPICS]
    .filter(t => selected.has(t.label))
    .reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="max-w-2xl mx-auto py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="text-4xl mb-3">⚡</div>
        <h1 className="font-sora font-black text-2xl text-slate-800 mb-2">Question Rush</h1>
        <p className="font-dm text-sm text-slate-400">
          Build speed and accuracy under pressure. Select your focus area.
        </p>
      </motion.div>

      {/* EBRW Section */}
      <TopicBlock
        icon="📖" title="English Reading & Writing"
        count={327} topics={EBRW_TOPICS}
        selected={selected} onToggle={toggle}
      />

      {/* Math Section */}
      <TopicBlock
        icon="📐" title="Math"
        count={420} topics={MATH_TOPICS}
        selected={selected} onToggle={toggle}
      />

      {/* Recent sessions */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
          Recent Sessions
        </p>
        <div className="space-y-2">
          {RECENT_SESSIONS.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all hover:-translate-x-0"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.72)',
              }}
            >
              <div>
                <div className="font-sora text-sm font-bold text-slate-800">
                  {s.questions} questions · {s.ago}
                </div>
                <div className="font-dm text-xs text-slate-400 mt-0.5">
                  <span style={{ color: '#27ae60' }}>●</span> {s.correct} correct &nbsp;
                  <span style={{ color: '#e74c3c' }}>●</span> {s.wrong} wrong &nbsp;
                  ⏱ {s.time}
                </div>
              </div>
              <span className="text-slate-300">→</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Start button */}
      <div className="text-center">
        <p className="font-dm text-sm text-slate-400 mb-4">
          {totalQ} questions ready · {selected.size} topic{selected.size !== 1 ? 's' : ''} selected
        </p>
        <motion.button
          whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(1,43,170,0.50)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/question-rush/active')}
          disabled={selected.size === 0}
          className="font-sora font-bold text-white px-12 py-4 rounded-full text-base
                     disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          style={{
            background: 'linear-gradient(135deg, #012BAA, #2d52d4)',
            boxShadow: '0 8px 28px rgba(1,43,170,0.40)',
          }}
        >
          Start Rush ⚡
        </motion.button>
      </div>
    </div>
  )
}

function TopicBlock({ icon, title, count, topics, selected, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-5 mb-4"
      style={{
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(255,255,255,0.72)',
        boxShadow: '0 6px 24px rgba(0,25,70,0.07)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{icon}</span>
        <span className="font-sora font-bold text-slate-800">{title}</span>
        <span className="font-dm text-xs text-slate-400 ml-auto">{count} questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t.label}
            onClick={() => onToggle(t.label)}
            className="px-3 py-1.5 rounded-full font-sora text-xs font-semibold transition-all"
            style={selected.has(t.label)
              ? { background: 'rgba(1,43,170,0.08)', border: '1.5px solid #012BAA', color: '#012BAA' }
              : { background: 'rgba(255,255,255,0.60)', border: '1.5px solid rgba(255,255,255,0.72)', color: '#6b7a99' }
            }
          >
            {t.label}
            <span className="ml-1.5 opacity-60">{t.count}q</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}