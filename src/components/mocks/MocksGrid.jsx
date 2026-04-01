import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_TESTS } from '../../data/satQuestions'

const MODULES = [
  'Full Mock Test (3h 15min)',
  'Module 1 EBRW',
  'Module 2 EBRW',
  'Module 1 Math',
  'Module 2 Math',
]

export default function MocksGrid() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-sora font-black text-xl text-slate-800 mb-6">📝 Full-Length Tests</h1>

      <div className="grid grid-cols-3 gap-4">
        {MOCK_TESTS.map((mock, i) => (
          <motion.div
            key={mock.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,25,70,0.14)' }}
            onClick={() => setSelected(mock)}
            className="rounded-2xl p-5 cursor-pointer transition-all"
            style={{
              background: 'rgba(255,255,255,0.58)',
              border: '1px solid rgba(255,255,255,0.72)',
              boxShadow: '0 6px 24px rgba(0,25,70,0.08)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">📝</span>
              <StatusBadge status={mock.status} />
            </div>
            <div className="font-sora font-bold text-sm text-slate-800 mb-1">{mock.name}</div>
            <div className="font-dm text-xs text-slate-400">
              {mock.status === 'completed'
                ? `Score: ${mock.score} · ${mock.date}`
                : mock.status === 'in-progress'
                ? `${mock.done}/${mock.total} questions done`
                : `${mock.total} questions · Digital SAT Format`}
            </div>
            {mock.status === 'in-progress' && (
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,25,70,0.08)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round(mock.done / mock.total * 100)}%`,
                    background: 'linear-gradient(90deg, #012BAA, #2d52d4)',
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Module selection modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,25,70,0.45)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="w-full max-w-md rounded-3xl p-10 text-center"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 24px 64px rgba(0,25,70,0.20)',
              }}
            >
              <div className="text-4xl mb-3">📝</div>
              <h2 className="font-sora font-black text-xl text-slate-800 mb-1">{selected.name}</h2>
              <p className="font-dm text-sm text-slate-400 mb-6">Choose your test format</p>

              <div className="flex flex-col gap-3">
                <button
                  className="w-full py-3.5 rounded-full font-sora font-bold text-white text-sm transition-all hover:opacity-90"
                  style={{ background: '#012BAA', boxShadow: '0 6px 20px rgba(1,43,170,0.35)' }}
                  onClick={() => setSelected(null)}
                >
                  {MODULES[0]}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  {MODULES.slice(1).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelected(null)}
                      className="py-3 rounded-full font-sora font-bold text-sm transition-all hover:opacity-80"
                      style={{
                        background: 'rgba(255,255,255,0.70)',
                        border: '1.5px solid rgba(0,25,70,0.12)',
                        color: '#0d1b3e',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 font-dm text-sm text-slate-400 hover:text-slate-600 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    completed:    { bg: 'rgba(39,174,96,0.12)',   color: '#27ae60',  label: 'Completed' },
    'in-progress': { bg: 'rgba(243,156,18,0.12)', color: '#f39c12',  label: 'In Progress' },
    'not-started': { bg: 'rgba(0,25,70,0.07)',    color: '#9ca3af',  label: 'Not Started' },
  }
  const s = styles[status]
  return (
    <span className="font-sora text-[10px] font-bold px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}