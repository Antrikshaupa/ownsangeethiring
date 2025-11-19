import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowLeft, ArrowRight, SkipBack, SkipForward } from 'lucide-react'
import { personalityQuestions } from '../../data/personalityQuestions'
import { submitApplication } from '../../utils/api'

export default function PersonalityTest() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(Array(40).fill(null))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    // Check if application data exists
    const applicationData = sessionStorage.getItem('applicationData')
    if (!applicationData) {
      navigate('/apply')
    }
  }, [navigate])

  const handleAnswer = (choiceId) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = choiceId;
    setAnswers(newAnswers);

    // Auto-advance to the next question block
    if (currentQuestion < 39) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < 39) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToQuestion = (index) => {
    setCurrentQuestion(index)
    setShowReview(false)
  }

  const answeredCount = answers.filter(a => a !== null).length
  const progress = (answeredCount / 40) * 100
  const currentPair = personalityQuestions[currentQuestion]

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answeredCount < 40) {
      setError('Please answer all 40 questions before submitting.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Get application data from sessionStorage
      const applicationData = JSON.parse(sessionStorage.getItem('applicationData'))
      
      // Combine with test answers
      const fullData = {
        ...applicationData,
        testAnswers: answers,
      }

      // Submit to backend
      await submitApplication(fullData)

      // Clear session storage
      sessionStorage.removeItem('applicationData')

      // Navigate to thank you page
      navigate('/thank-you')
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                      err.response?.data?.details?.[0]?.msg || 
                      err.response?.data?.message ||
                      'Failed to submit application. Please try again.'
      setError(errorMsg)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Personality Assessment</h1>
          <p className="text-gray-600 text-sm">Question Block {currentQuestion + 1} of 40</p>
          
          {/* Progress Bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-blue-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary-600 whitespace-nowrap">
              {answeredCount}/40
            </span>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showReview ? (
          <>
            {/* Main Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 animate-fadeIn">
              {/* Question Number */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {currentQuestion + 1}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Question</p>
                    <p className="text-lg font-semibold text-gray-900">Block {currentQuestion + 1} of 40</p>
                  </div>
                </div>
                {answers[currentQuestion] !== null && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-medium">Answered</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <p className="text-gray-600 text-center mb-8 text-sm">
                Choose the statement that better describes you
              </p>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentPair.pair.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleAnswer(question.id)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                      answers[currentQuestion] === question.id
                        ? 'border-primary-600 bg-primary-50 shadow-lg scale-102'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        answers[currentQuestion] === question.id
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === question.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-lg text-gray-800 leading-relaxed">{question.hindi}</p>
                        <p className="text-md text-gray-600 leading-relaxed mt-2">{question.english}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => setShowReview(true)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  Review All
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === 39}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Submit Section */}
            {answeredCount === 40 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center animate-slideUp">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">All Questions Answered!</h3>
                <p className="text-gray-600 mb-6">You're ready to submit your application.</p>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all font-semibold text-lg"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Review Mode */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Review Your Answers</h2>
                <button
                  onClick={() => setShowReview(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-8">
                {answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold transition-all transform hover:scale-110 ${
                      answer === null
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-500 text-white shadow-lg'
                    } ${currentQuestion === index ? 'ring-2 ring-primary-600 scale-110' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {answeredCount === 40 ? (
                    <span className="text-green-600 font-semibold">✓ All questions answered</span>
                  ) : (
                    <span>{40 - answeredCount} questions remaining</span>
                  )}
                </p>
                <button
                  onClick={() => setShowReview(false)}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .scale-102 {
          transform: scale(1.02);
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
