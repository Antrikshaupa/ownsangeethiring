import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ExternalLink } from 'lucide-react'
import { getApplications } from '../../utils/api'
import { format } from 'date-fns'

export default function ApplicationsList() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    primaryStyle: '',
    applyingFor: '',
    page: 1,
    limit: 20,
  })

  useEffect(() => {
    loadApplications()
  }, [filters])

  const loadApplications = async () => {
    setLoading(true)
    try {
      const response = await getApplications(filters)
      setApplications(response.data.applications || [])
      setPagination(response.data.pagination)
    } catch (error) {
      console.error('Error loading applications:', error)
      console.error('Error response:', error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-600 mt-1">Manage and review candidate applications</p>
      </div>

      <div className="card mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="input"
            >
              <option value="">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={filters.primaryStyle}
              onChange={(e) => handleFilterChange('primaryStyle', e.target.value)}
              className="input"
            >
              <option value="">All Styles</option>
              <option value="Action">Action</option>
              <option value="Process">Process</option>
              <option value="People">People</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Style</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Scores</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{app.fullName}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{app.email}</td>
                      <td className="py-3 px-4 text-gray-600 capitalize">{app.applyingFor}</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-blue-100 text-blue-800">{app.primaryStyle}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        A:{app.scoreAction} P:{app.scoreProcess} Pe:{app.scorePeople} I:{app.scoreIdeas}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge badge-${app.status}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {format(new Date(app.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/admin/applications/${app.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {applications.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No applications found
              </div>
            )}

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="btn btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
