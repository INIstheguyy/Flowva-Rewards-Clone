import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ClaimFeaturedRewardModal({ onSubmit, onClose, isLoading }) {
  const [email, setEmail] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setScreenshot(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setScreenshotPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !screenshot) {
      alert('Please fill in all fields')
      return
    }
    onSubmit({ email, screenshot: screenshotPreview })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Claim Your 25 Points
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Sign up for Reclaim (free, no payment needed), then fill the form below:
        </p>

        {/* Instructions */}
        <div className="bg-purple-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">1.</span>
            <span className="text-slate-700">Enter your Reclaim sign-up email.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">2.</span>
            <span className="text-slate-700">
              Upload a screenshot of your Reclaim profile showing your email.
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            After verification, you'll get 25 Flowva Points! 🎉😊
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email used on Reclaim
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload screenshot (mandatory)
            </label>
            
            {screenshotPreview ? (
              <div className="relative">
                <img 
                  src={screenshotPreview} 
                  alt="Screenshot preview" 
                  className="w-full h-40 object-cover rounded-lg border border-slate-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setScreenshot(null)
                    setScreenshotPreview(null)
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">Choose file</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Claim'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}