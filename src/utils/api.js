import axios from 'axios'

// Use the default axios instance which will have headers set by AuthContext
const api = axios.create({
  baseURL: '/api',
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Applications
export const submitApplication = (data) => api.post('/applications', data)
export const getApplications = (params) => api.get('/applications', { params })
export const getApplication = (id) => api.get(`/applications/${id}`)
export const updateApplicationStatus = (id, status, notes) => 
  api.patch(`/applications/${id}/status`, { status, notes })
export const updateApplicationNotes = (id, notes) => 
  api.patch(`/applications/${id}/notes`, { notes })
export const deleteApplication = (id) => api.delete(`/applications/${id}`)

// Interviews
export const createInterview = (data) => api.post('/interviews', data)
export const getInterviews = (params) => api.get('/interviews', { params })
export const getInterview = (id) => api.get(`/interviews/${id}`)
export const updateInterview = (id, data) => api.patch(`/interviews/${id}`, data)
export const deleteInterview = (id) => api.delete(`/interviews/${id}`)

// Settings
export const getSettings = () => api.get('/settings')
export const getSetting = (key) => api.get(`/settings/${key}`)
export const updateSetting = (key, value) => api.put(`/settings/${key}`, { value })
export const updateSettings = (settings) => api.post('/settings/bulk', { settings })
export const getVideoUrl = () => api.get('/settings/public/video-url')

// Stats
export const getDashboardStats = () => api.get('/stats/dashboard')
export const getScoreDistribution = () => api.get('/stats/score-distribution')

export default api
