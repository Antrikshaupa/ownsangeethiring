import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getApplication } from '../../utils/api'
import { personalityQuestions } from '../../data/personalityQuestions'

const questionCategoryMapping = {
  1: 'Action', 2: 'Process', 3: 'People', 4: 'Ideas', 5: 'Ideas', 6: 'People', 7: 'Process', 8: 'Action',
  9: 'Action', 10: 'Process', 11: 'People', 12: 'Ideas', 13: 'Action', 14: 'Process', 15: 'People', 16: 'Ideas',
  17: 'Action', 18: 'Process', 19: 'People', 20: 'Ideas', 21: 'Ideas', 22: 'People', 23: 'Process', 24: 'Action',
  25: 'Process', 26: 'Action', 27: 'People', 28: 'Ideas', 29: 'People', 30: 'Process', 31: 'Action', 32: 'Ideas',
  33: 'Action', 34: 'Process', 35: 'People', 36: 'Ideas', 37: 'Process', 38: 'People', 39: 'Ideas', 40: 'Action',
  41: 'Action', 42: 'Process', 43: 'People', 44: 'Ideas', 45: 'Ideas', 46: 'People', 47: 'Process', 48: 'Action',
  49: 'People', 50: 'Action', 51: 'Process', 52: 'Ideas', 53: 'Action', 54: 'Ideas', 55: 'Process', 56: 'People',
  57: 'Action', 58: 'Process', 59: 'People', 60: 'Ideas', 61: 'Ideas', 62: 'Process', 63: 'Action', 64: 'People',
  65: 'Action', 66: 'Process', 67: 'People', 68: 'Ideas', 69: 'Process', 70: 'Action', 71: 'People', 72: 'Ideas',
  73: 'Ideas', 74: 'Action', 75: 'Process', 76: 'People', 77: 'Ideas', 78: 'Process', 79: 'Action', 80: 'People',
}

export default function ApplicationAnswers() {
  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getApplication(id)
        setApplication(response.data)
      } catch (error) {
        console.error('Error loading application answers:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

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

  const selectedIds = Array.isArray(application.testAnswers) ? application.testAnswers : []

  // Build lookup map from question ID to question details + block (pair) index
  const questionById = new Map()
  personalityQuestions.forEach((block) => {
    block.pair.forEach((q) => {
      questionById.set(q.id, {
        ...q,
        block: block.id,
        style: questionCategoryMapping[q.id] || 'Unknown',
      })
    })
  })

  const selectedQuestions = selectedIds
    .map((id) => questionById.get(id))
    .filter(Boolean)
    .sort((a, b) => a.block - b.block)

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          to={`/admin/applications/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Application
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Selected Personality Test Statements</h1>
        <p className="text-gray-600 mt-1">{application.fullName}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <p className="text-gray-700">
              Candidate selected <span className="font-semibold">{selectedIds.length}</span> out of 40 statements.
            </p>
            <p className="text-gray-700 mt-1">
              Primary style: <span className="font-semibold">{application.primaryStyle}</span>
            </p>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Selected Statements Only</h2>
            {selectedQuestions.length === 0 ? (
              <p className="text-gray-600">No test answers available for this application.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {selectedQuestions.map((q) => (
                  <div key={q.id} className="py-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-gray-500">
                        Block {q.block} · Q{q.id}
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                        {q.style}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{q.english}</p>
                    <p className="text-sm text-gray-700">{q.hindi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Scores</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-gray-500">Action</p>
                <p className="text-xl font-bold text-red-600">{application.scoreAction}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500">Process</p>
                <p className="text-xl font-bold text-blue-600">{application.scoreProcess}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">People</p>
                <p className="text-xl font-bold text-green-600">{application.scorePeople}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-500">Ideas</p>
                <p className="text-xl font-bold text-purple-600">{application.scoreIdeas}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
