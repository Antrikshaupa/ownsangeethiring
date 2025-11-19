import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, TrendingUp, Clock, CheckCircle, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getDashboardStats } from '../../utils/api'
import { format } from 'date-fns'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await getDashboardStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error loading stats:', error)
      console.error('Error details:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const styleChartData = stats ? [
    { name: 'Action', count: stats.styleCounts.Action || 0 },
    { name: 'Process', count: stats.styleCounts.Process || 0 },
    { name: 'People', count: stats.styleCounts.People || 0 },
    { name: 'Ideas', count: stats.styleCounts.Ideas || 0 },
  ] : []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of applications and personality profiles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalApplications || 0}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.statusCounts.shortlisted || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Interviews Scheduled</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.statusCounts.interview_scheduled || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Selected</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.statusCounts.selected || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Personality Styles Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Personality Styles Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={styleChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applying For Breakdown */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Application Types</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Full-time Job</span>
                <span className="font-semibold">{stats?.applyingForCounts.job || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${((stats?.applyingForCounts.job || 0) / (stats?.totalApplications || 1)) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Internship</span>
                <span className="font-semibold">{stats?.applyingForCounts.internship || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${((stats?.applyingForCounts.internship || 0) / (stats?.totalApplications || 1)) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Freelancer</span>
                <span className="font-semibold">{stats?.applyingForCounts.freelancer || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${((stats?.applyingForCounts.freelancer || 0) / (stats?.totalApplications || 1)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
          <Link to="/admin/applications" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Applying For</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Primary Style</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/applications/${app.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {app.fullName}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{app.email}</td>
                  <td className="py-3 px-4 text-gray-600 capitalize">{app.applyingFor}</td>
                  <td className="py-3 px-4">
                    <span className="badge bg-blue-100 text-blue-800">
                      {app.primaryStyle}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge badge-${app.status}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {format(new Date(app.createdAt), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {stats?.recentApplications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No applications yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
