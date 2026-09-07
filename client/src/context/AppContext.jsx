import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AppContext = createContext()

// In development use Vite's /api proxy so the app works on whichever port
// Vite selects. In production VITE_BASE_URL should point to the deployed API.
const configuredApiUrl = (import.meta.env.VITE_BASE_URL || '').trim().replace(/\/$/, '')
axios.defaults.baseURL = import.meta.env.DEV ? '' : configuredApiUrl
axios.defaults.headers.common.Accept = 'application/json'

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [userToken, setUserToken] = useState(null)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')
  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedBlogs') || '[]')
    } catch {
      return []
    }
  })

  const toggleSaved = (id) => {
    setSavedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
      localStorage.setItem('savedBlogs', JSON.stringify(next))
      return next
    })
  }

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all')
      data.success ? setBlogs(data.blogs) : toast.error(data.message)
    } catch (error) {
      // Do not block the authentication pages if the public blog endpoint is unavailable.
      console.error('Failed to load blogs:', error)
    }
  }

  useEffect(() => {
    fetchBlogs()

    const storedToken = localStorage.getItem('token')
    const storedUserToken = localStorage.getItem('userToken')
    const activeToken = storedUserToken || storedToken

    if (activeToken) {
      setToken(storedToken || null)
      setUserToken(storedUserToken || null)
      axios.defaults.headers.common.Authorization = `Bearer ${activeToken}`
    }
  }, [])

  const value = {
    axios,
    navigate,
    token,
    setToken,
    userToken,
    setUserToken,
    user,
    setUser,
    blogs,
    setBlogs,
    input,
    setInput,
    savedIds,
    toggleSaved,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
