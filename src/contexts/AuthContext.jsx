import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

// Configure axios defaults for API communication
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async () => {
    try {
      const response = await api.get('/auth/verify')
      setAdmin(response.data.admin)
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('adminToken')
      delete api.defaults.headers.common['Authorization']
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { token, admin } = response.data
    
    localStorage.setItem('adminToken', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setAdmin(admin)
    
    return admin
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    delete api.defaults.headers.common['Authorization']
    delete axios.defaults.headers.common['Authorization']
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
