import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/context/AuthContext'

export function useClaimReward() {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ rewardId, rewardCost }) => {
      // 1. Create user_rewards record
      const { error: claimError } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: rewardId,
          status: 'completed',
        })

      if (claimError) throw claimError

      // 2. Deduct points from user
      const { error: pointsError } = await supabase.rpc('decrement_points', {
        user_id: user.id,
        points: rewardCost,
      })

      if (pointsError) throw pointsError

      // 3. Create point transaction record
      const { error: transactionError } = await supabase
        .from('point_transactions')
        .insert({
          user_id: user.id,
          amount: -rewardCost,
          type: 'reward_redemption',
          description: `Claimed reward`,
        })

      if (transactionError) throw transactionError

      return true
    },
    onSuccess: () => {
      // Refetch user profile (to update points balance)
      queryClient.invalidateQueries(['profile', user?.id])
      // Could also refetch user_rewards if we display claimed rewards
      queryClient.invalidateQueries(['userRewards', user?.id])
    },
  })
}