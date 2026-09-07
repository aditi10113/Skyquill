import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const Auth = () => {
  const { axios, setUserToken, setUser } = useAppContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [mode, setMode] = useState(location.pathname === '/signup' ? 'signup' : 'signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const isSignup = mode === 'signup'

  useEffect(() => {
    setMode(location.pathname === '/signup' ? 'signup' : 'signin')
  }, [location.pathname])

  const submit = async (e) => {
    e.preventDefault()

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (isSignup && !cleanName) {
      toast.error('Please enter your full name.')
      return
    }
    if (!cleanEmail) {
      toast.error('Please enter your email.')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    try {
      const endpoint = isSignup ? '/api/user/register' : '/api/user/login'
      const payload = isSignup
        ? { name: cleanName, email: cleanEmail, password }
        : { email: cleanEmail, password }

      const { data } = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (!data?.success) {
        toast.error(data?.message || 'Authentication failed.')
        return
      }

      if (!data.token || !data.user) {
        toast.error('The server did not return a valid login session.')
        return
      }

      localStorage.setItem('userToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      setUserToken(data.token)
      setUser(data.user)

      toast.success(data.message || (isSignup ? 'Account created successfully.' : 'Signed in successfully.'))
      navigate('/', { replace: true })
    } catch (error) {
      const status = error.response?.status
      const serverMessage = error.response?.data?.message

      if (!error.response) {
        toast.error('Cannot connect to the SkyQuill server. Start it with npm run server in the server folder.')
      } else if (status === 404) {
        toast.error(`SkyQuill API not found. Start the backend on port 3000. (${isSignup ? 'POST /api/user/register' : 'POST /api/user/login'})`)
      } else {
        toast.error(serverMessage || `Request failed with status code ${status}.`)
      }
      console.error('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setName('')
    setPassword('')
    navigate(isSignup ? '/signin' : '/signup')
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-sky-50 via-white to-indigo-50'>
      <div className='w-full max-w-md bg-white p-7 sm:p-9 border border-primary/15 shadow-xl shadow-primary/10 rounded-2xl'>
        <button
          type='button'
          onClick={() => navigate('/')}
          className='text-sm text-gray-500 hover:text-primary mb-7'
        >
          ← Back to home
        </button>

        <div className='text-center'>
          <p className='text-primary font-semibold tracking-wide'>SkyQuill</p>
          <h1 className='text-3xl font-bold text-gray-800 mt-2'>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className='text-gray-500 mt-2'>
            {isSignup
              ? 'Join SkyQuill and keep your reading journey in one place.'
              : 'Sign in to continue your SkyQuill journey.'}
          </p>
        </div>

        <form onSubmit={submit} className='mt-8 space-y-5'>
          {isSignup && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete='name'
                placeholder='Your name'
                className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              required
              autoComplete='email'
              placeholder='you@example.com'
              className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              required
              minLength={6}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              placeholder='At least 6 characters'
              className='w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'
            />
            {isSignup && <p className='text-xs text-gray-400 mt-1'>Use at least 6 characters.</p>}
          </div>

          <button
            disabled={loading}
            type='submit'
            className='w-full py-3 font-semibold bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className='text-center mt-6 text-sm text-gray-500'>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type='button'
            onClick={switchMode}
            className='ml-1 text-primary font-semibold hover:underline'
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
