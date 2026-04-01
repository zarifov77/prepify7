import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SAT_TOPICS, SAT_QUESTIONS } from '../../data/satQuestions'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']
const DIFF_COLORS = {
  easy:   { bg: 'rgba(39,174,96,0.12)',   color: '#27ae60' },
  medium: { bg: 'rgba(243,156,18,0.12)',  color: '#f39c12' },
  hard:   { bg: 'rgba(231,76,60,0.12)',   color: '#e74c3c' },
}

export default function QuestionBank() {
  const [difficulty, setDifficulty] = useState('All')
  const [activeQ, setActiveQ] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const filteredQuestions = SAT_QUESTIONS.filter(q =>
    difficulty === 'All' || q.difficulty === difficulty.toLowerCase()
  )

  const openQuestion = (q) => {
    setActiveQ(q)
    setChosen(null)
    setRevealed(false)
  }

  const handleAnswer = (idx) => {
    if (revealed) return
    setChosen(idx)
    setRevealed(true)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-sora font-black text-xl text-slate-800">📚 Question Bank</h1>
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className="px-4 py-2 rounded-full font-sora text-xs font-bold transition-all"
              style={difficulty === d
                ? { background: '#012BAA', color: '#fff', boxShadow: '0 4px 12px rgba(1,43,170,0.30)' }
                : {
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.75)',
                    color: '#6b7a99',
                  }
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* EBRW */}
        <SectionCard
          section={SAT_TOPICS.ebrw}
          difficulty={difficulty}
          onOpenQuestion={openQuestion}
        />
        {/* Math */}
        <SectionCard
          section={SAT_TOPICS.math}
          difficulty={difficulty}
          onOpenQuestion={openQuestion}
        />
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {activeQ && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,25,70,0.40)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => e.target === e.currentTarget && setActiveQ(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="w-full max-w-2xl rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 24px 64px rgba(0,25,70,0.20)',
              }}
            >
              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-sora text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}>
                  {activeQ.section}
                </span>
                <span className="font-dm text-xs text-slate-400">{activeQ.topic}</span>
                <span className="font-sora text-xs font-bold px-2.5 py-1 rounded-full capitalize ml-auto"
                  style={DIFF_COLORS[activeQ.difficulty]}>
                  {activeQ.difficulty}
                </span>
              </div>

              {/* Question */}
              <p className="font-dm text-base text-slate-800 leading-relaxed mb-6">
                {activeQ.text}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-5">
                {activeQ.options.map((opt, idx) => {
                  let style = {
                    background: 'rgba(255,255,255,0.55)',
                    border: '1.5px solid rgba(0,25,70,0.10)',
                    color: '#0d1b3e',
                  }
                  if (revealed) {
                    if (idx === activeQ.correct)
                      style = { background: 'rgba(39,174,96,0.10)', border: '1.5px solid #27ae60', color: '#0d1b3e' }
                    else if (idx === chosen)
                      style = { background: 'rgba(231,76,60,0.10)', border: '1.5px solid #e74c3c', color: '#0d1b3e' }
                    else
                      style = { background: 'rgba(255,255,255,0.40)', border: '1.5px solid rgba(0,25,70,0.06)', color: '#9ca3af' }
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-left font-dm text-sm transition-all"
                      style={style}
                    >
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center font-sora text-xs font-bold flex-shrink-0"
                        style={revealed && idx === activeQ.correct
                          ? { background: '#27ae60', color: '#fff' }
                          : revealed && idx === chosen
                          ? { background: '#e74c3c', color: '#fff' }
                          : { background: 'rgba(0,25,70,0.07)', color: '#6b7a99' }
                        }>
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-4 py-3 rounded-xl mb-5"
                    style={{ background: 'rgba(1,43,170,0.06)', border: '1px solid rgba(1,43,170,0.12)' }}
                  >
                    <p className="font-sora text-xs font-bold mb-1" style={{ color: '#012BAA' }}>Explanation</p>
                    <p className="font-dm text-sm text-slate-600">{activeQ.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setActiveQ(null)}
                className="w-full py-3 rounded-full font-sora font-bold text-sm text-white"
                style={{ background: '#012BAA', boxShadow: '0 4px 16px rgba(1,43,170,0.30)' }}
              >
                {revealed ? 'Next Question' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionCard({ section, difficulty, onOpenQuestion }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(255,255,255,0.72)',
        boxShadow: '0 6px 24px rgba(0,25,70,0.07)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-sora font-bold text-slate-800">{section.title}</span>
        <span className="font-dm text-xs text-slate-400">{section.total}q total</span>
      </div>

      {section.sections.map((sub) => (
        <div key={sub.name} className="mb-4">
          <p className="font-sora text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
            {sub.name}
          </p>
          {sub.topics.map((topic) => (
            <motion.div
              key={topic.name}
              whileHover={{ x: 3 }}
              onClick={() => {
                const q = SAT_QUESTIONS.find(
                  (q) =>
                    q.topic.toLowerCase().includes(topic.name.split(' ')[0].toLowerCase()) &&
                    (difficulty === 'All' || q.difficulty === difficulty.toLowerCase())
                )
                if (q) onOpenQuestion(q)
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl mb-1.5
                         cursor-pointer transition-all"
              style={{
                background: 'rgba(255,255,255,0.50)',
                border: '1px solid rgba(255,255,255,0.65)',
              }}
            >
              <span className="font-dm text-sm text-slate-700">{topic.name}</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {topic.difficulties.map((d) => (
                    <div key={d} className="w-2 h-2 rounded-full" style={DIFF_COLORS[d]} />
                  ))}
                </div>
                <span className="font-sora text-xs font-bold text-slate-400">{topic.count}q</span>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}