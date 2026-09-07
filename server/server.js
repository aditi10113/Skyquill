import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ success: true, message: 'SkyQuill API is working' }))
app.get('/api/health', (req, res) => res.json({ success: true, message: 'SkyQuill API is healthy' }))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`
  })
})

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ success: false, message: err.message || 'Internal server error' })
})

app.listen(PORT, async () => {
  console.log(`SkyQuill backend is running on http://localhost:${PORT}`)
  try {
    await connectDB()
  } catch (error) {
    console.error('MongoDB is not connected. Authentication will not work until MONGODB_URI is fixed.')
  }
})

export default app
