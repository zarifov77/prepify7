import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      questionsTotal: 847,
      questionsToday: 27,
      streak: 14,
      xp: 2340,
      accuracy: 76,
      studyTimeMinutes: 2520, // 42h
      weeklyData: [45, 62, 38, 71, 55, 80, 27],
      dreamScore: 1550,
      currentScore: 1390,
      topicBreakdown: [
        { name: 'Math, Algebra', pct: 81, color: '#3498db' },
        { name: 'Reading Evidence', pct: 34, color: '#9b59b6' },
        { name: 'Writing & Grammar', pct: 19, color: '#27ae60' },
      ],
      achievements: [
        { label: 'Complete 25 questions', done: true, progress: null },
        { label: 'Complete 100 questions', done: true, progress: null },
        { label: 'Maintain a 3-day streak', done: false, progress: '14 left' },
        { label: 'Complete 250 questions', done: false, progress: '187/250' },
        { label: 'Maintain 7-day streak', done: false, progress: '14 left' },
        { label: 'Complete 500 questions', done: false, progress: '187/500' },
        { label: 'Learn 20 vocab words', done: false, progress: '+17 left' },
      ],
      todayTasks: [
        { name: 'SAT Math: Linear Equations', tag: 'Math', time: '20 min', questions: 20 },
        { name: 'SAT Reading: Inference', tag: 'Reading', time: '20 min', questions: 10 },
        { name: 'Vocab — 20 words', tag: 'Words', time: '15 min', questions: 20 },
      ],
      addAttempt: ({ correct }) => set((s) => ({
        questionsTotal: s.questionsTotal + 1,
        questionsToday: s.questionsToday + 1,
        xp: s.xp + (correct ? 10 : 2),
        streak: correct ? s.streak + 1 : 0,
        accuracy: Math.round(
          ((s.accuracy / 100) * s.questionsTotal + (correct ? 1 : 0)) /
          (s.questionsTotal + 1) * 100
        ),
      })),
      addStudyTime: (mins) => set((s) => ({
        studyTimeMinutes: s.studyTimeMinutes + mins,
      })),
    }),
    { name: 'prepify-progress' }
  )
)

export default useProgressStore