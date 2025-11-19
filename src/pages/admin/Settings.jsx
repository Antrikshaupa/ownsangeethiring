import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { getSettings, updateSettings } from '../../utils/api'

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await getSettings()
      setSettings(response.data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      await updateSettings(settings)
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure application settings and email templates</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Video URL */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Video Instructions</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video URL (YouTube Embed)
            </label>
            <input
              type="url"
              value={settings.VIDEO_INSTRUCTIONS_URL || ''}
              onChange={(e) => handleChange('VIDEO_INSTRUCTIONS_URL', e.target.value)}
              className="input"
              placeholder="https://www.youtube.com/embed/..."
            />
            <p className="text-sm text-gray-500 mt-1">
              This video will be shown to candidates before they take the personality test
            </p>
          </div>
        </div>

        {/* Application Received Email */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Application Received Email</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sent to candidates after they submit their application
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={settings.EMAIL_TEMPLATE_APPLICATION_RECEIVED_SUBJECT || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_APPLICATION_RECEIVED_SUBJECT', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                value={settings.EMAIL_TEMPLATE_APPLICATION_RECEIVED_BODY || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_APPLICATION_RECEIVED_BODY', e.target.value)}
                rows={8}
                className="input"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available variables: {'{'}{'{'} name {'}'}{'}'}, {'{'}{'{'} applying_for {'}'}{'}'}
              </p>
            </div>
          </div>
        </div>

        {/* Shortlisted Email */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Shortlisted Email</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sent when a candidate is marked as shortlisted
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={settings.EMAIL_TEMPLATE_SHORTLISTED_SUBJECT || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_SHORTLISTED_SUBJECT', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                value={settings.EMAIL_TEMPLATE_SHORTLISTED_BODY || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_SHORTLISTED_BODY', e.target.value)}
                rows={8}
                className="input"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available variables: {'{'}{'{'} name {'}'}{'}'}, {'{'}{'{'} applying_for {'}'}{'}'}
              </p>
            </div>
          </div>
        </div>

        {/* Interview Invite Email */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Interview Invitation Email</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sent when an interview is scheduled
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={settings.EMAIL_TEMPLATE_INTERVIEW_INVITE_SUBJECT || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_INTERVIEW_INVITE_SUBJECT', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                value={settings.EMAIL_TEMPLATE_INTERVIEW_INVITE_BODY || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_INTERVIEW_INVITE_BODY', e.target.value)}
                rows={10}
                className="input"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available variables: {'{'}{'{'} name {'}'}{'}'}, {'{'}{'{'} scheduled_at {'}'}{'}'}, {'{'}{'{'} mode {'}'}{'}'}, {'{'}{'{'} location_or_link {'}'}{'}'}, {'{'}{'{'} extra_instructions {'}'}{'}'}
              </p>
            </div>
          </div>
        </div>

        {/* Rejected Email */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Rejection Email</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sent when a candidate is marked as rejected
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={settings.EMAIL_TEMPLATE_REJECTED_SUBJECT || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_REJECTED_SUBJECT', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                value={settings.EMAIL_TEMPLATE_REJECTED_BODY || ''}
                onChange={(e) => handleChange('EMAIL_TEMPLATE_REJECTED_BODY', e.target.value)}
                rows={8}
                className="input"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available variables: {'{'}{'{'} name {'}'}{'}'}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Save Changes</h3>
              <p className="text-sm text-gray-600">
                Click save to apply all changes to email templates and settings
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
