import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SAT_QUESTIONS } from '../../data/satQuestions'
import { predictSATScore } from '../../lib/scoring'

const PREDICTOR_QUESTIONS = SAT_QUESTIONS.slice(0, 20)
const OPT_LETTERS = ['A', 'B', 'C', 'D']

export default function ScorePredictor() {
  const [started, setStarted] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [result, setResult] = useState(null)

  const currentQ = PREDICTOR_QUESTIONS[qIndex]
  const progress = (qIndex / PREDICTOR_QUESTIONS.length) * 100

  const handleAnswer = (idx) => {
    if (revealed) return
    setChosen(idx)
    setRevealed(true)
  }

  const handleNext = () => {
    const newAnswers = [...answers, { correct: chosen === currentQ.correct, section: currentQ.section }]
    setAnswers(newAnswers)

    if (qIndex + 1 >= PREDICTOR_QUESTIONS.length) {
      const mathAnswers = newAnswers.filter(a => a.section === 'Math')
      const ebwAnswers = newAnswers.filter(a => a.section === 'EBRW')
      setResult(predictSATScore(
        mathAnswers.filter(a => a.correct).length,
        ebwAnswers.filter(a => a.correct).length,
        mathAnswers.length,
        ebwAnswers.length
      ))
    } else {
      setQIndex(i => i + 1)
      setChosen(null)
      setRevealed(false)
    }
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="font-sora font-black text-2xl text-slate-800 mb-3">Score Predictor</h1>
          <p className="font-dm text-sm text-slate-500 mb-2 leading-relaxed">
            Answer <strong>20 diagnostic questions</strong> — 10 Math + 10 EBRW — and we'll predict
            your SAT score range using the actual College Board scoring model.
          </p>
          <p className="font-dm text-xs text-slate-400 mb-8">Accuracy within ±50 points</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Questions', val: '20' },
              { label: 'Duration', val: '~15 min' },
              { label: 'Accuracy', val: '±50 pts' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl py-4 px-3"
                style={{ background: 'rgba(255,255,255,0.58)', border: '1px solid rgba(255,255,255,0.72)' }}>
                <div className="font-sora font-black text-xl" style={{ color: '#012BAA' }}>{s.val}</div>
                <div className="font-dm text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            className="font-sora font-bold text-white px-12 py-4 rounded-full text-base transition-all hover:-translate-y-1"
            style={{ background: '#012BAA', boxShadow: '0 8px 28px rgba(1,43,170,0.40)' }}
          >
            Start Predictor →
          </button>
        </motion.div>
      </div>
    )
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-8"
      >
        <div className="rounded-3xl p-10"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: '0 20px 60px rgba(0,25,70,0.14)',
          }}
        >
          <div className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
            Predicted SAT Score
          </div>
          <div className="font-sora font-black text-6xl mb-2" style={{ color: '#012BAA' }}>
            {result.total.toLocaleString()}
          </div>
          <div className="font-dm text-sm text-slate-400 mb-1">
            Math: {result.math} · EBRW: {result.ebrw}
          </div>
          <div className="font-dm text-xs text-slate-400 mb-2">
            Range: {result.range[0]}–{result.range[1]}
          </div>
          <div
            className="inline-block font-sora text-xs font-bold px-3 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}
          >
            Top {100 - result.percentile}% of test-takers
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Math Score', val: result.math, max: 800 },
              { label: 'EBRW Score', val: result.ebrw, max: 800 },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 text-left"
                style={{ background: 'rgba(1,43,170,0.06)', border: '1px solid rgba(1,43,170,0.10)' }}>
                <div className="font-dm text-xs text-slate-400 mb-1">{s.label}</div>
                <div className="font-sora font-black text-2xl" style={{ color: '#012BAA' }}>{s.val}</div>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,25,70,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${s.val / s.max * 100}%`, background: '#012BAA' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setStarted(false); setQIndex(0); setAnswers([]); setResult(null); setChosen(null); setRevealed(false) }}
              className="flex-1 py-3 rounded-full font-sora font-bold text-white text-sm"
              style={{ background: '#012BAA', boxShadow: '0 4px 16px rgba(1,43,170,0.30)' }}
            >
              Retake
            </button>
            <a href="/dashboard/planner"
              className="flex-1 py-3 rounded-full font-sora font-bold text-sm flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(0,25,70,0.12)', color: '#0d1b3e' }}>
              Build Study Plan →
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Progress */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-sora text-xs font-bold text-slate-400 whitespace-nowrap">
          Q{qIndex + 1} / {PREDICTOR_QUESTIONS.length}
        </span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,25,70,0.08)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #012BAA, #2d52d4)' }}
          />
        </div>
        <span className="font-sora text-xs font-bold whitespace-nowrap" style={{ color: '#012BAA' }}>
          {currentQ.section}
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-7 mb-5"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: '0 12px 48px rgba(0,25,70,0.10)',
          }}
        >
          <p className="font-dm text-base text-slate-800 leading-relaxed mb-6">{currentQ.text}</p>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let style = { background: 'rgba(255,255,255,0.55)', border: '1.5px solid rgba(255,255,255,0.72)', color: '#0d1b3e' }
              if (revealed) {
                if (idx === currentQ.correct) style = { background: 'rgba(39,174,96,0.10)', border: '1.5px solid #27ae60', color: '#0d1b3e' }
                else if (idx === chosen) style = { background: 'rgba(231,76,60,0.10)', border: '1.5px solid #e74c3c', color: '#0d1b3e' }
                else style = { background: 'rgba(255,255,255,0.35)', border: '1.5px solid rgba(255,255,255,0.50)', color: '#9ca3af' }
              }
              return (
                <button key={idx} onClick={() => handleAnswer(idx)}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left font-dm text-sm transition-all hover:scale-[1.005]"
                  style={style}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center font-sora text-xs font-bold flex-shrink-0"
                    style={revealed && idx === currentQ.correct ? { background: '#27ae60', color: '#fff' }
                      : revealed && idx === chosen ? { background: '#e74c3c', color: '#fff' }
                      : { background: 'rgba(0,25,70,0.07)', color: '#6b7a99' }}>
                    {OPT_LETTERS[idx]}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <button
              onClick={handleNext}
              className="font-sora font-bold text-white px-8 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ background: '#012BAA', boxShadow: '0 6px 20px rgba(1,43,170,0.35)' }}
            >
              {qIndex + 1 === PREDICTOR_QUESTIONS.length ? 'See My Score →' : 'Next Question →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}