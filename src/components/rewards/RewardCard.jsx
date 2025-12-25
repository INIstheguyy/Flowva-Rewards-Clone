import { Button } from '@/components/ui/button'

export default function RewardCard({ reward, userPoints, onClaim }) {
  const isLocked = reward.status === 'locked' && userPoints < reward.cost_points
  const isUnlocked = reward.status === 'locked' && userPoints >= reward.cost_points
  const isComingSoon = reward.status === 'coming_soon'

  const getButtonText = () => {
    if (isComingSoon) return 'Coming Soon'
    if (isLocked) return 'Locked'
    if (isUnlocked) return 'Claim'
    return 'Locked'
  }

  const getButtonVariant = () => {
    if (isUnlocked) return 'default'
    return 'secondary'
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 flex flex-col">
      {/* Icon */}
      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
        {reward.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">
        {reward.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 text-center mb-4 flex-1">
        {reward.description}
      </p>

      {/* Points cost */}
      {!isComingSoon && (
        <div className="flex items-center justify-center gap-1 mb-4">
          <span className="text-yellow-500">⭐</span>
          <span className="font-semibold text-slate-900">
            {reward.cost_points.toLocaleString()} pts
          </span>
        </div>
      )}

      {/* Action button */}
      <Button
        onClick={() => onClaim(reward)}
        disabled={!isUnlocked}
        variant={getButtonVariant()}
        className="w-full"
      >
        {getButtonText()}
      </Button>
    </div>
  )
}