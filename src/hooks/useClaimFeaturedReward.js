import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export function useClaimFeaturedReward() {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, screenshot, toolName, pointsAmount }) => {
      // Check if user already claimed this tool
      const { data: existingClaim } = await supabase
        .from('featured_reward_claims')
        .select('id')
        .eq('user_id', user.id)
        .eq('tool_name', toolName)
        .single()

      if (existingClaim) {
        throw new Error('You have already claimed this reward')
      }

      // Insert claim record
      const { error } = await supabase
        .from('featured_reward_claims')
        .insert({
          user_id: user.id,
          tool_name: toolName,
          email_provided: email,
          screenshot_url: screenshot, // In production, you'd upload to storage
          points_amount: pointsAmount,
          status: 'pending',
        })

      if (error) throw error

      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['featuredClaims', user?.id])
    },
  })
}