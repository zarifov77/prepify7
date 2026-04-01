import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardHome from './components/dashboard/DashboardHome'
import QuestionBank from './components/questionbank/QuestionBank'
import RushSelection from './components/questionrush/RushSelection'
import RushActive from './components/questionrush/RushActive'
import MocksGrid from './components/mocks/MocksGrid'
import ScorePredictor from './components/predictor/ScorePredictor'
import StudyPlanner from './components/planner/StudyPlanner'
import IELTSListening from './components/ielts/IELTSListening'
import IELTSReading from './components/ielts/IELTSReading'
import IELTSWriting from './components/ielts/IELTSWriting'
import NotFound from './pages/NotFound'
import useAuthStore from './store/authStore'
import About from './pages/About'

function ProtectedRoute({ children }) {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Sora, sans-serif',
            fontSize: '0.85rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.72)',
            color: '#0d1b3e',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="question-bank" element={<QuestionBank />} />
          <Route path="question-rush" element={<RushSelection />} />
          <Route path="question-rush/active" element={<RushActive />} />
          <Route path="mocks" element={<MocksGrid />} />
          <Route path="predictor" element={<ScorePredictor />} />
          <Route path="planner" element={<StudyPlanner />} />
          <Route path="ielts/listening" element={<IELTSListening />} />
          <Route path="ielts/reading" element={<IELTSReading />} />
          <Route path="ielts/writing" element={<IELTSWriting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}