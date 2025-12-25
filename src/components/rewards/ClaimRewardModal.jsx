import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ClaimRewardModal({ reward, userPoints, onConfirm, onClose, isLoading }) {
  if (!reward) return null

  const pointsAfterClaim = userPoints - reward.cost_points

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

        {/* Icon */}
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          {reward.icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Claim {reward.title}?
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-600 text-center mb-6">
          {reward.description}
        </p>

        {/* Points breakdown */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Current Balance</span>
            <span className="font-semibold text-slate-900">
              {userPoints.toLocaleString()} pts
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Cost</span>
            <span className="font-semibold text-red-600">
              -{reward.cost_points.toLocaleString()} pts
            </span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between">
            <span className="font-medium text-slate-900">New Balance</span>
            <span className="font-bold text-purple-600">
              {pointsAfterClaim.toLocaleString()} pts
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Claiming...' : 'Confirm Claim'}
          </Button>
        </div>
      </div>
    </div>
  )
}