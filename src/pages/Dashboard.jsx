import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar'
import OrbBackground from '../components/ui/OrbBackground'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login', { replace: true })
  }, [user, navigate])

  return (
    <div className="flex h-screen overflow-hidden relative">
      <OrbBackground />
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}