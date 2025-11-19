import { CheckCircle, Mail, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="card text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for applying to OwnSangeet and completing the personality test.
          </p>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 text-left">
              <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Check Your Email</h3>
                <p className="text-gray-600 text-sm">
                  We've sent a confirmation email to your inbox. Our team will review your application 
                  and personality profile, and we'll get back to you soon if there's a good match.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>What happens next?</strong>
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">1.</span>
                <span>Our team reviews your application and test results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">2.</span>
                <span>If shortlisted, you'll receive an email notification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">3.</span>
                <span>We'll schedule an interview to discuss the opportunity</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/" className="btn btn-secondary inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
