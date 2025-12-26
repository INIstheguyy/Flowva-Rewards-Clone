import { useState, useContext, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import flowvaLogo from '@/assets/images/flowva_logo-xVpZI3-U.png'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const { signUp } = useContext(AuthContext)
  const navigate = useNavigate()

  // Get referral code from URL
  const referralCode = searchParams.get('ref')

  useEffect(() => {
    if (referralCode) {
      console.log('Referred by code:', referralCode)
    }
  }, [referralCode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // 1. Sign up the user
      const { data: authData, error: signUpError } = await signUp(email, password)

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      // 2. If there's a referral code, process it
      if (referralCode && authData?.user) {
        await processReferral(authData.user.id, referralCode)
      }

      // 3. Navigate to login
      alert('Account created successfully! You can now log in.')
      navigate('/login')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const processReferral = async (newUserId, refCode) => {
    try {
      // Find the referrer
      const { data: referrer, error: referrerError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('referral_code', refCode)
        .single()

      if (referrerError || !referrer) {
        console.log('Invalid referral code:', refCode)
        return
      }

      // Don't allow self-referral
      if (referrer.id === newUserId) {
        console.log('Cannot refer yourself')
        return
      }

      // Create referral record
      const { error: referralError } = await supabase
        .from('referrals')
        .insert({
          referrer_id: referrer.id,
          referred_id: newUserId,
          points_awarded: 25,
        })

      if (referralError) {
        console.error('Error creating referral:', referralError)
        return
      }

      // Award points to referrer
      await supabase.rpc('increment_points', {
        user_id: referrer.id,
        points: 25,
      })

      // Update referral count
      await supabase.rpc('increment_referral_count', {
        user_id: referrer.id,
      })

      // Create transaction
      await supabase.from('point_transactions').insert({
        user_id: referrer.id,
        amount: 25,
        type: 'referral',
        description: `Referral bonus for inviting ${email}`,
      })

      console.log('Referral processed successfully!')
    } catch (err) {
      console.error('Error processing referral:', err)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = referralCode 
        ? `${window.location.origin}/dashboard/rewards?ref=${referralCode}`
        : `${window.location.origin}/dashboard/rewards`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      })
      if (error) throw error
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        {/* <div className="flex justify-center mb-8">
          <img src={flowvaLogo} alt="Flowva" className="h-12" />
        </div> */}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Referral Badge */}
          {referralCode && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
              <p className="text-sm text-purple-700 text-center font-medium">
                🎉 You've been invited! Sign up to earn bonus points!
              </p>
            </div>
          )}

          <h1 className="text-2xl font-bold text-purple-600 text-center mb-2">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-600 text-center mb-6">
            Sign up to manage your tools
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-full text-base font-semibold transition-all" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign up Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-slate-700">Sign in with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}