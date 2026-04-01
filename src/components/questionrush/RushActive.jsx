import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTimer } from '../../hooks/useTimer'
import TimerCircle from '../ui/TimerCircle'
import { SAT_QUESTIONS } from '../../data/satQuestions'
import useProgressStore from '../../store/progressStore'

const TIMER_DURATION = 45
const OPT_LETTERS = ['A', 'B', 'C', 'D']

export default function RushActive() {
  const navigate = useNavigate()
  const { addAttempt } = useProgressStore()

  const [qIndex, setQIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [streak, setStreak] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen] = useState(null)
  const [finished, setFinished] = useState(false)

  const currentQ = SAT_QUESTIONS[qIndex % SAT_QUESTIONS.length]

  const handleExpire = useCallback(() => {
    if (!answered) {
      setAnswered(true)
      setChosen(null) // time expired, no answer
      setWrong(w => w + 1)
      setStreak(0)
      setTimeout(() => nextQuestion(), 1200)
    }
  }, [answered])

  const { timeLeft, start, progress } = useTimer(TIMER_DURATION, handleExpire)

  useEffect(() => {
    start()
  }, [qIndex])

  const nextQuestion = () => {
    if (qIndex + 1 >= SAT_QUESTIONS.length) {
      setFinished(true)
      return
    }
    setQIndex(i => i + 1)
    setAnswered(false)
    setChosen(null)
  }

  const handleAnswer = (idx) => {
    if (answered) return
    setAnswered(true)
    setChosen(idx)
    const isCorrect = idx === currentQ.correct
    if (isCorrect) {
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
    } else {
      setWrong(w => w + 1)
      setStreak(0)
    }
    addAttempt({ correct: isCorrect })
    setTimeout(() => nextQuestion(), 1300)
  }

  if (finished) {
    return <RushResults correct={correct} wrong={wrong} total={qIndex + 1} />
  }

  const optionStyle = (idx) => {
    if (!answered) return {
      background: 'rgba(255,255,255,0.55)',
      border: '1.5px solid rgba(255,255,255,0.72)',
      color: '#0d1b3e',
    }
    if (idx === currentQ.correct) return {
      background: 'rgba(39,174,96,0.10)',
      border: '1.5px solid #27ae60',
      color: '#0d1b3e',
    }
    if (idx === chosen && idx !== currentQ.correct) return {
      background: 'rgba(231,76,60,0.10)',
      border: '1.5px solid #e74c3c',
      color: '#0d1b3e',
    }
    return {
      background: 'rgba(255,255,255,0.40)',
      border: '1.5px solid rgba(255,255,255,0.50)',
      color: '#9ca3af',
    }
  }

  const optLetterStyle = (idx) => {
    if (!answered) return { background: 'rgba(0,25,70,0.07)', color: '#6b7a99' }
    if (idx === currentQ.correct) return { background: '#27ae60', color: '#fff' }
    if (idx === chosen && idx !== currentQ.correct) return { background: '#e74c3c', color: '#fff' }
    return { background: 'rgba(0,25,70,0.05)', color: '#d1d5db' }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-2xl mb-6"
        style={{
          background: 'rgba(255,255,255,0.60)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.72)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-sora font-black text-base" style={{ color: '#012BAA' }}>⚡</span>
          <span className="font-sora font-bold text-sm text-slate-700">Question Rush</span>
        </div>
        <div className="flex gap-5">
          <span className="font-sora text-sm font-bold text-slate-700">
            Q <span className="text-slate-400 font-dm font-normal">{qIndex + 1}/{SAT_QUESTIONS.length}</span>
          </span>
          <span className="font-sora text-sm font-bold" style={{ color: '#27ae60' }}>✓ {correct}</span>
          <span className="font-sora text-sm font-bold" style={{ color: '#e74c3c' }}>✕ {wrong}</span>
          <span className="font-sora text-sm font-bold text-slate-700">🔥 {streak}</span>
        </div>
        <button
          onClick={() => setFinished(true)}
          className="font-sora text-xs font-semibold text-slate-400 px-3 py-1.5 rounded-full
                     hover:text-slate-600 transition-all"
          style={{ border: '1.5px solid rgba(0,25,70,0.12)' }}
        >
          End Session
        </button>
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-5">
        <TimerCircle timeLeft={timeLeft} progress={progress} size={110} />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl p-7"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: '0 12px 48px rgba(0,25,70,0.12), 0 1px 0 rgba(255,255,255,0.90) inset',
          }}
        >
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sora text-xs font-bold text-slate-400">Q{qIndex + 1}</span>
            <span
              className="font-sora text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}
            >
              {currentQ.section}
            </span>
            <span
              className="font-sora text-xs font-bold px-2.5 py-1 rounded-full capitalize"
              style={{
                background: currentQ.difficulty === 'easy'
                  ? 'rgba(39,174,96,0.10)'
                  : currentQ.difficulty === 'medium'
                  ? 'rgba(243,156,18,0.10)'
                  : 'rgba(231,76,60,0.10)',
                color: currentQ.difficulty === 'easy' ? '#27ae60'
                  : currentQ.difficulty === 'medium' ? '#f39c12' : '#e74c3c',
              }}
            >
              {currentQ.difficulty}
            </span>
          </div>

          {/* Question text */}
          <p className="font-dm text-base text-slate-800 leading-relaxed mb-6">
            {currentQ.text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={!answered ? { x: 3 } : {}}
                whileTap={!answered ? { scale: 0.99 } : {}}
                onClick={() => handleAnswer(idx)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left
                           font-dm text-sm transition-all"
                style={optionStyle(idx)}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center
                             font-sora text-xs font-bold flex-shrink-0 transition-all"
                  style={optLetterStyle(idx)}
                >
                  {OPT_LETTERS[idx]}
                </span>
                {opt}
              </motion.button>
            ))}
          </div>

          {/* Explanation (shown after answer) */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 px-4 py-3 rounded-xl overflow-hidden"
                style={{ background: 'rgba(1,43,170,0.06)', border: '1px solid rgba(1,43,170,0.12)' }}
              >
                <p className="font-sora text-xs font-bold mb-1" style={{ color: '#012BAA' }}>
                  Explanation
                </p>
                <p className="font-dm text-sm text-slate-600">{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Question number pill */}
      <div className="flex justify-center mt-5">
        <div
          className="font-sora font-bold text-sm px-5 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.60)',
            border: '1px solid rgba(255,255,255,0.72)',
            color: '#0d1b3e',
          }}
        >
          {qIndex + 1}
        </div>
      </div>
    </div>
  )
}

function RushResults({ correct, wrong, total }) {
  const navigate = useNavigate()
  const accuracy = total > 0 ? Math.round(correct / total * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center py-8"
    >
      <div
        className="rounded-3xl p-10"
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.80)',
          boxShadow: '0 20px 60px rgba(0,25,70,0.14)',
        }}
      >
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="font-sora font-black text-2xl text-slate-800 mb-6">Session Complete!</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { val: correct, label: 'Correct', color: '#27ae60', bg: 'rgba(39,174,96,0.10)' },
            { val: wrong, label: 'Wrong', color: '#e74c3c', bg: 'rgba(231,76,60,0.10)' },
            { val: `${accuracy}%`, label: 'Accuracy', color: '#012BAA', bg: 'rgba(1,43,170,0.10)' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl py-4 px-2" style={{ background: s.bg }}>
              <div className="font-sora font-black text-2xl" style={{ color: s.color }}>{s.val}</div>
              <div className="font-dm text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/dashboard/question-rush')}
            className="flex-1 py-3 rounded-full font-sora font-bold text-white text-sm transition-all"
            style={{ background: '#012BAA', boxShadow: '0 6px 20px rgba(1,43,170,0.35)' }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 rounded-full font-sora font-bold text-sm"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1.5px solid rgba(0,25,70,0.12)',
              color: '#0d1b3e',
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  )
}