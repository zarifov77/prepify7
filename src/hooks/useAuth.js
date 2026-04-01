import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import useAuthStore from '../store/authStore'

export function useAuth() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, setLoading])
}