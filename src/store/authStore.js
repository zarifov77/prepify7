import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null })
      },
    }),
    { name: 'prepify-auth' }
  )
)

export default useAuthStore