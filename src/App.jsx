import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Candidate pages
import Landing from './pages/candidate/Landing'
import ApplicationForm from './pages/candidate/ApplicationFormNew'
import TestInstructions from './pages/candidate/TestInstructions'
import PersonalityTest from './pages/candidate/PersonalityTestNew'
import ThankYou from './pages/candidate/ThankYou'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ApplicationsList from './pages/admin/ApplicationsList'
import ApplicationDetail from './pages/admin/ApplicationDetail'
import ApplicationAnswers from './pages/admin/ApplicationAnswers'
import Settings from './pages/admin/Settings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Candidate Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/test-instructions" element={<TestInstructions />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<ApplicationsList />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="applications/:id/answers" element={<ApplicationAnswers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
