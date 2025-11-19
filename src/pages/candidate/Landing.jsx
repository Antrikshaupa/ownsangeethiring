import { Link } from 'react-router-dom'
import { Briefcase, Users, Lightbulb, ArrowRight } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="OwnSangeet logo"
            className="h-10 w-auto"
          />
          <h1 className="text-3xl font-bold text-primary-600">OwnSangeet</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're looking for talented individuals to join OwnSangeet. Whether you're seeking a job, 
            internship, or freelance opportunity, we'd love to learn more about you.
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 btn btn-primary text-lg px-8 py-4"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Opportunities</h3>
            <p className="text-gray-600">
              Full-time jobs, internships, and freelance positions available
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personality-Based Matching</h3>
            <p className="text-gray-600">
              We use a unique personality test to find the best fit for our team
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learn AI With Us</h3>
            <p className="text-gray-600">
              Opportunity to learn and work with cutting-edge AI technologies
            </p>
          </div>
        </div>

        {/* Application Process */}
        <div className="card max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Application Process</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Fill Application Form</h4>
                <p className="text-gray-600">Share your basic information, skills, and experience</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Watch Instructions Video</h4>
                <p className="text-gray-600">Learn about the personality test and how it works</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Complete Personality Test</h4>
                <p className="text-gray-600">40 quick questions to understand your work style (Action, Process, People, Ideas)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Hear Back From Us</h4>
                <p className="text-gray-600">We'll review your application and contact you if there's a match</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Your data is used solely for hiring purposes and will be kept confidential.
            We respect your privacy and comply with all data protection regulations.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 OwnSangeet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
