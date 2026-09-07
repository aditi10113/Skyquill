import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'))

    const uri = process.env.MONGODB_URI?.trim()
    if (!uri) throw new Error('MONGODB_URI is missing in server/.env')

    // If the URI already contains a database name, use it as-is.
    // Otherwise connect to the application's inknest database.
    const hasDatabase = /^mongodb(?:\+srv)?:\/\/[^/]+\/[^/?]+/.test(uri)
    const connectionString = hasDatabase ? uri : `${uri.replace(/\/$/, '')}/inknest`

    await mongoose.connect(connectionString)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}

export default connectDB
