import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VerificationPendingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Claim Submitted!
        </h2>

        {/* Message */}
        <p className="text-slate-600 mb-6">
          Your claim is being verified. You'll receive your <strong>25 points</strong> once 
          we confirm your Reclaim sign-up. This usually takes 24-48 hours.
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-slate-700">
            <strong>What happens next?</strong>
          </p>
          <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
            <li>Our team will verify your submission</li>
            <li>You'll get a notification when it's approved</li>
            <li>Points will be added to your balance automatically</li>
          </ul>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Got it!
        </Button>
      </div>
    </div>
  )
}