import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export function useDailyStreak() {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['dailyStreak', user?.id],
    queryFn: async () => {
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('daily_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!user?.id,
  })

  const claimMutation = useMutation({
    mutationFn: async () => {
      const now = new Date()
      const lastClaimed = query.data?.last_claimed_at
      
      // Check if already claimed today
      if (lastClaimed) {
        const lastClaimedDate = new Date(lastClaimed)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const lastDate = new Date(lastClaimedDate.getFullYear(), lastClaimedDate.getMonth(), lastClaimedDate.getDate())
        
        if (today.getTime() === lastDate.getTime()) {
          throw new Error('Already claimed today')
        }
      }

      // Update streak
      const { error: streakError } = await supabase
        .from('daily_streaks')
        .update({
          current_streak: (query.data?.current_streak || 0) + 1,
          last_claimed_at: now.toISOString(),
        })
        .eq('user_id', user.id)

      if (streakError) throw streakError

      // Add points transaction
      const { error: transactionError } = await supabase
        .from('point_transactions')
        .insert({
          user_id: user.id,
          amount: 5,
          type: 'daily_streak',
          description: 'Daily streak claimed',
        })

      if (transactionError) throw transactionError

      // Update user's points balance
      const { error: profileError } = await supabase.rpc('increment_points', {
        user_id: user.id,
        points: 5,
      })

      if (profileError) throw profileError
    },
    onSuccess: () => {
      // Invalidate queries to refetch fresh data
      queryClient.invalidateQueries(['dailyStreak', user?.id])
      queryClient.invalidateQueries(['profile', user?.id])
    },
  })

  return {
    ...query,
    claimStreak: claimMutation.mutate,
    isClaiming: claimMutation.isPending,
  }
}