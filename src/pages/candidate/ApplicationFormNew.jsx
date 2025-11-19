import { useState, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react'

// Memoized Skills Input Component to prevent unnecessary re-renders
const SkillsInput = memo(({ skillInput, setSkillInput, skills, setSkills }) => {
  const addSkill = useCallback((e) => {
    e.preventDefault()
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }, [skillInput, skills, setSkills, setSkillInput])

  const removeSkill = useCallback((skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }, [skills, setSkills])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(e)
    }
  }, [addSkill])

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., React, Python, Design"
          autoComplete="off"
          spellCheck="false"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-all"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all flex items-center gap-2 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-200 transition-all"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-primary-900"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
      {skills.length === 0 && (
        <p className="text-gray-500 text-sm">Add at least one skill</p>
      )}
    </div>
  )
})

export default function ApplicationForm() {
  const navigate = useNavigate()
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  const hasWorkedBefore = watch('hasWorkedBefore')
  const wantsToLearnAi = watch('wantsToLearnAiWithUs')
  
  const totalSteps = 4
  const progressPercentage = (currentStep / totalSteps) * 100


  const handleNextStep = async () => {
    // Validate skills on step 2
    if (currentStep === 2 && skills.length === 0) {
      alert('Please add at least one skill')
      return
    }

    const fieldsToValidate = {
      1: ['fullName', 'email', 'whatsappNumber'],
      2: ['course', 'collegeName'],
      3: ['applyingFor', 'address'],
      4: ['hasWorkedBefore', 'wantsToLearnAiWithUs', 'resumeDriveLink']
    }
    
    const isValid = await trigger(fieldsToValidate[currentStep])
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        skills: skills.join(', '),
        hasWorkedBefore: data.hasWorkedBefore === 'yes',
        wantsToLearnAiWithUs: data.wantsToLearnAiWithUs === 'yes',
      }
      sessionStorage.setItem('applicationData', JSON.stringify(formData))
      navigate('/test-instructions')
    } finally {
      setIsSubmitting(false)
    }
  }

  const FormField = ({ label, error, children, required = false }) => (
    <div className="mb-6 animate-fadeIn">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm animate-slideDown">
          <AlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="OwnSangeet logo"
              className="h-8 w-auto"
            />
            <h1 className="text-3xl font-bold text-primary-600">OwnSangeet Application</h1>
          </div>
          <p className="text-gray-600 text-sm mt-1">Step {currentStep} of {totalSteps}</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between mb-3">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-green-500 text-white'
                    : step === currentStep
                    ? 'bg-primary-600 text-white scale-110'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Personal Information</h2>
                
                <FormField label="Full Name" error={errors.fullName} required>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('fullName', { required: 'Full name is required' })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <FormField label="Email Address" error={errors.email} required>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <FormField label="WhatsApp Number" error={errors.whatsappNumber} required>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    {...register('whatsappNumber', {
                      required: 'WhatsApp number is required',
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: 'Please enter a valid phone number (10-15 digits)'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.whatsappNumber
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Education Details</h2>
                
                <FormField label="Course/Degree" error={errors.course} required>
                  <input
                    type="text"
                    placeholder="B.Tech Computer Science"
                    {...register('course', { required: 'Course is required' })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.course
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <FormField label="College/University Name" error={errors.collegeName} required>
                  <input
                    type="text"
                    placeholder="ABC University"
                    {...register('collegeName', { required: 'College name is required' })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.collegeName
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <FormField label="College Timing (if applicable)" error={errors.collegeTiming}>
                  <input
                    type="text"
                    placeholder="9 AM - 3 PM"
                    {...register('collegeTiming')}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.collegeTiming
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <div className="mb-6 animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Skills <span className="text-red-500 ml-1">*</span>
                  </label>
                  <SkillsInput 
                    skillInput={skillInput}
                    setSkillInput={setSkillInput}
                    skills={skills}
                    setSkills={setSkills}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Application Details */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Application Details</h2>
                
                <FormField label="Applying For" required error={errors.applyingFor}>
                  <select
                    {...register('applyingFor', { required: 'Please select an option' })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none bg-white ${
                      errors.applyingFor
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary-500 hover:border-gray-300'
                    }`}
                  >
                    <option value="">Select an option...</option>
                    <option value="job">Full-time Job</option>
                    <option value="internship">Internship</option>
                    <option value="freelancer">Freelance Work</option>
                  </select>
                </FormField>

                <FormField label="Address" required error={errors.address}>
                  <textarea
                    placeholder="Your full address"
                    rows={4}
                    {...register('address', {
                      required: 'Address is required',
                      minLength: {
                        value: 10,
                        message: 'Address must be at least 10 characters',
                      },
                      maxLength: {
                        value: 500,
                        message: 'Address must not exceed 500 characters',
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none ${
                      errors.address
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                </FormField>

                <FormField label="Have you worked before?" error={errors.hasWorkedBefore} required>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      hasWorkedBefore === 'yes'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="yes"
                        {...register('hasWorkedBefore', { required: 'Please select an option' })}
                        className="w-5 h-5 text-primary-600 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 font-medium text-base">Yes, I have work experience</span>
                    </label>
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      hasWorkedBefore === 'no'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="no"
                        {...register('hasWorkedBefore', { required: 'Please select an option' })}
                        className="w-5 h-5 text-primary-600 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 font-medium text-base">No, this is my first role</span>
                    </label>
                  </div>
                </FormField>

                {hasWorkedBefore === 'yes' && (
                  <FormField label="Tell us about your previous experience" error={errors.previousExperienceDetails}>
                    <textarea
                      placeholder="Describe your previous work experience, roles, and responsibilities..."
                      rows={4}
                      {...register('previousExperienceDetails')}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none ${
                        errors.previousExperienceDetails
                          ? 'border-red-300 focus:border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                      }`}
                    />
                  </FormField>
                )}
              </div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Final Details</h2>
                
                <FormField label="Would you like to learn AI with us?" error={errors.wantsToLearnAiWithUs} required>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      wantsToLearnAi === 'yes'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="yes"
                        {...register('wantsToLearnAiWithUs', { required: 'Please select an option' })}
                        className="w-5 h-5 text-primary-600 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 font-medium text-base">Yes, I'm interested in learning AI</span>
                    </label>
                    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      wantsToLearnAi === 'no'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}>
                      <input
                        type="radio"
                        value="no"
                        {...register('wantsToLearnAiWithUs', { required: 'Please select an option' })}
                        className="w-5 h-5 text-primary-600 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 font-medium text-base">No, not interested</span>
                    </label>
                  </div>
                </FormField>

                {wantsToLearnAi === 'yes' && (
                  <FormField label="Tell us more about your interest in AI" error={errors.aiLearningNotes}>
                    <textarea
                      placeholder="What aspects of AI interest you? What would you like to learn?"
                      rows={4}
                      {...register('aiLearningNotes')}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none resize-none ${
                        errors.aiLearningNotes
                          ? 'border-red-300 focus:border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                      }`}
                    />
                  </FormField>
                )}

                <FormField label="Resume Google Drive Link" required error={errors.resumeDriveLink}>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    {...register('resumeDriveLink', {
                      required: 'Resume link is required',
                      pattern: {
                        value: /^https:\/\/drive\.google\.com\//,
                        message: 'Please provide a valid Google Drive link'
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                      errors.resumeDriveLink
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-primary-500 bg-white hover:border-gray-300'
                    }`}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    In Google Drive sharing settings, set <strong>General access → Anyone with the link → Viewer</strong> so that anyone with the link can view your resume.
                  </p>
                </FormField>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium ml-auto"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all font-medium ml-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
