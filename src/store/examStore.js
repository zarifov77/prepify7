import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useExamStore = create(
  persist(
    (set) => ({
      exam: 'sat',        // 'sat' | 'ielts'
      examDate: null,     // ISO string e.g. '2025-05-03'
      weaknesses: [],
      goal: 'both',       // 'sat' | 'ielts' | 'both'
      setExam: (exam) => set({ exam }),
      setExamDate: (date) => set({ examDate: date }),
      setWeaknesses: (weaknesses) => set({ weaknesses }),
      setGoal: (goal) => set({ goal }),
    }),
    { name: 'prepify-exam' }
  )
)

export default useExamStore