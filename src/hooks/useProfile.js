import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext' 

export function useProfile() {
  const { user } = useContext(AuthContext)

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      console.log('Fetched profile data:', data)
      return data
    },
    enabled: !!user?.id, // Only run if user is logged in
  })
}