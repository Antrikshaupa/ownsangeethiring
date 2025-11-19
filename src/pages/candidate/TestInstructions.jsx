import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { getVideoUrl } from '../../utils/api'

export default function TestInstructions() {
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState('')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    // Check if application data exists
    const applicationData = sessionStorage.getItem('applicationData')
    if (!applicationData) {
      navigate('/apply')
      return
    }

    // Fetch video URL
    getVideoUrl()
      .then(response => setVideoUrl(response.data.url))
      .catch(error => console.error('Error fetching video URL:', error))
  }, [navigate])

  const handleContinue = () => {
    if (agreed) {
      navigate('/personality-test')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-primary-600">Personality Test Instructions</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Section */}
        {videoUrl && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Watch This First</h2>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Test Instructions Video"
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Test Rules & Guidelines</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">40 Questions, 2 Choices Each</h3>
                <p className="text-gray-600">
                  You'll see 40 boxes, each containing two statements. Choose the one that resonates more with you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">No Right or Wrong Answers</h3>
                <p className="text-gray-600">
                  This is not a test of knowledge. We're simply trying to understand your natural work style and preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Be Honest & Authentic</h3>
                <p className="text-gray-600">
                  Choose based on what truly describes you, not what you think we want to hear. Authenticity helps us find the best fit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Take Your Time</h3>
                <p className="text-gray-600">
                  There's no time limit. Read each statement carefully and make thoughtful choices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Four Personality Styles</h3>
                <p className="text-gray-600">
                  The test measures four work styles: <strong>Action</strong> (results-driven), 
                  <strong> Process</strong> (systematic), <strong> People</strong> (relationship-focused), 
                  and <strong> Ideas</strong> (innovative). You'll have a mix of all four, with one primary style.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Complete in One Session</h3>
                <p className="text-gray-600">
                  Once you start, please complete all 40 questions. Your progress won't be saved if you leave.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement & Continue */}
        <div className="card">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <span className="text-gray-700">
              I have watched the video and read the instructions. I understand that I should answer honestly 
              and complete all 40 questions in one session.
            </span>
          </label>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleContinue}
              disabled={!agreed}
              className="btn btn-primary flex items-center gap-2"
            >
              Start Personality Test
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
