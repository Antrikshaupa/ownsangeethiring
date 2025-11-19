import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, ExternalLink, Calendar, Save, Trash2 } from 'lucide-react'
import { 
  getApplication, 
  updateApplicationStatus, 
  updateApplicationNotes,
  createInterview,
  deleteApplication 
} from '../../utils/api'
import { format } from 'date-fns'

export default function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [interviewData, setInterviewData] = useState({
    scheduledAt: '',
    mode: 'online',
    locationOrLink: '',
    extraInstructions: '',
  })

  useEffect(() => {
    loadApplication()
  }, [id])

  const loadApplication = async () => {
    try {
      const response = await getApplication(id)
      setApplication(response.data)
      setNotes(response.data.notes || '')
      setStatus(response.data.status)
    } catch (error) {
      console.error('Error loading application:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await updateApplicationStatus(id, newStatus, notes)
      setStatus(newStatus)
      setApplication(prev => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const handleSaveNotes = async () => {
    try {
      await updateApplicationNotes(id, notes)
      alert('Notes saved successfully')
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Failed to save notes')
    }
  }

  const handleScheduleInterview = async (e) => {
    e.preventDefault()
    try {
      await createInterview({
        applicationId: id,
        ...interviewData,
      })
      setShowInterviewModal(false)
      loadApplication()
      alert('Interview scheduled and email sent!')
    } catch (error) {
      console.error('Error scheduling interview:', error)
      alert('Failed to schedule interview')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id)
        navigate('/admin/applications')
      } catch (error) {
        console.error('Error deleting application:', error)
        alert('Failed to delete application')
      }
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="p-8">
        <div className="card text-center py-12">
          <p className="text-gray-600">Application not found</p>
          <Link to="/admin/applications" className="btn btn-primary mt-4">
            Back to Applications
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          to="/admin/applications"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{application.fullName}</h1>
            <p className="text-gray-600 mt-1">{application.email}</p>
          </div>
          <button onClick={handleDelete} className="btn btn-danger flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-medium">{application.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">College</p>
                <p className="font-medium">{application.collegeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Applying For</p>
                <p className="font-medium capitalize">{application.applyingFor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">College Timing</p>
                <p className="font-medium">{application.collegeTiming || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{application.address}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {application.skills.split(',').map((skill, index) => (
                <span key={index} className="badge bg-primary-100 text-primary-800">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            <p className="text-sm text-gray-600 mb-2">Has worked before?</p>
            <p className="font-medium mb-4">{application.hasWorkedBefore ? 'Yes' : 'No'}</p>
            {application.hasWorkedBefore && application.previousExperienceDetails && (
              <>
                <p className="text-sm text-gray-600 mb-2">Details</p>
                <p className="text-gray-700 whitespace-pre-wrap">{application.previousExperienceDetails}</p>
              </>
            )}
          </div>

          {/* AI Learning */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">AI Learning Interest</h2>
            <p className="text-sm text-gray-600 mb-2">Wants to learn AI?</p>
            <p className="font-medium mb-4">{application.wantsToLearnAiWithUs ? 'Yes' : 'No'}</p>
            {application.wantsToLearnAiWithUs && application.aiLearningNotes && (
              <>
                <p className="text-sm text-gray-600 mb-2">Notes</p>
                <p className="text-gray-700 whitespace-pre-wrap">{application.aiLearningNotes}</p>
              </>
            )}
          </div>

          {/* Resume */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Resume</h2>
            {application.resumeDriveLink ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  Link: <span className="text-xs break-all">{application.resumeDriveLink}</span>
                </p>
                <button
                  onClick={() => {
                    const link = application.resumeDriveLink;
                    
                    // Extract file ID from various Google Drive URL formats
                    let fileId = null;
                    
                    // Format: https://drive.google.com/file/d/{FILE_ID}/view
                    if (link.includes('/file/d/')) {
                      fileId = link.split('/file/d/')[1].split('/')[0];
                    }
                    // Format: https://drive.google.com/open?id={FILE_ID}
                    else if (link.includes('id=')) {
                      fileId = link.split('id=')[1].split('&')[0];
                    }
                    
                    if (fileId) {
                      // Use export URL for direct access
                      const exportUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                      window.open(exportUrl, '_blank');
                    } else {
                      window.open(link, '_blank');
                    }
                  }}
                  className="btn btn-secondary inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Resume
                </button>
              </>
            ) : (
              <p className="text-gray-500">No resume link provided</p>
            )}
          </div>

          {/* Personality Test Results */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Personality Test Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-3xl font-bold text-red-600">{application.scoreAction}</p>
                <p className="text-sm text-gray-600 mt-1">Action</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{application.scoreProcess}</p>
                <p className="text-sm text-gray-600 mt-1">Process</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{application.scorePeople}</p>
                <p className="text-sm text-gray-600 mt-1">People</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">{application.scoreIdeas}</p>
                <p className="text-sm text-gray-600 mt-1">Ideas</p>
              </div>
            </div>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Primary Style</p>
              <p className="text-2xl font-bold text-primary-600">{application.primaryStyle}</p>
              <p className="text-sm text-gray-600 mt-2">
                Completed {application.totalSelected} out of 40 questions
              </p>
            </div>
            <div className="mt-4">
              <Link
                to={`/admin/applications/${application.id}/answers`}
                className="btn btn-secondary"
              >
                View Selected Statements
              </Link>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Admin Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="input mb-4"
              placeholder="Add notes about this candidate..."
            />
            <button onClick={handleSaveNotes} className="btn btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Notes
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Status</h2>
            <div className="space-y-2">
              {['applied', 'shortlisted', 'interview_scheduled', 'selected', 'rejected'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-colors ${
                    status === s
                      ? 'border-primary-600 bg-primary-50 font-medium'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {s.replace('_', ' ').charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowInterviewModal(true)}
                className="w-full btn btn-primary flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </button>
              <a
                href={`mailto:${application.email}`}
                className="w-full btn btn-secondary flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>

          {/* Metadata */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Metadata</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Application ID</p>
                <p className="font-mono text-xs">{application.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Submitted</p>
                <p className="font-medium">{format(new Date(application.createdAt), 'PPpp')}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium">{format(new Date(application.updatedAt), 'PPpp')}</p>
              </div>
            </div>
          </div>

          {/* Interviews */}
          {application.interviews && application.interviews.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Interviews</h2>
              <div className="space-y-3">
                {application.interviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-3">
                    <p className="font-medium">{format(new Date(interview.scheduledAt), 'PPp')}</p>
                    <p className="text-sm text-gray-600 capitalize">{interview.mode}</p>
                    <p className="text-sm text-gray-600 mt-1">{interview.locationOrLink}</p>
                    <span className={`badge badge-${interview.status} mt-2`}>
                      {interview.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Schedule Interview</h2>
            <form onSubmit={handleScheduleInterview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewData.scheduledAt}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                  required
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode
                </label>
                <select
                  value={interviewData.mode}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, mode: e.target.value }))}
                  className="input"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Link
                </label>
                <input
                  type="text"
                  value={interviewData.locationOrLink}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, locationOrLink: e.target.value }))}
                  required
                  className="input"
                  placeholder="Zoom link or office address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Instructions
                </label>
                <textarea
                  value={interviewData.extraInstructions}
                  onChange={(e) => setInterviewData(prev => ({ ...prev, extraInstructions: e.target.value }))}
                  rows={3}
                  className="input"
                  placeholder="Any additional instructions..."
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  Schedule & Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
