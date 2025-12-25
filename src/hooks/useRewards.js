import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useRewards() {
  return useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('cost_points', { ascending: true })

      if (error) throw error
      return data
    },
  })
}