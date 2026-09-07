import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import { useAppContext } from '../context/AppContext'

const Saved = () => {
  const { blogs, savedIds } = useAppContext()
  const savedBlogs = blogs.filter(blog => savedIds.includes(blog._id))

  return (
    <>
      <Navbar />
      <main className='mx-8 sm:mx-16 xl:mx-32 py-14 min-h-[60vh]'>
        <div className='mb-10'>
          <p className='text-primary font-medium mb-2'>Your reading list</p>
          <h1 className='text-3xl sm:text-5xl font-semibold text-gray-800'>Saved articles</h1>
          <p className='mt-3 text-gray-500'>Keep interesting stories here and come back when you have time.</p>
        </div>
        {savedBlogs.length ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
            {savedBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        ) : (
          <div className='rounded-2xl border border-primary/15 bg-white/70 p-10 text-center'>
            <p className='text-lg font-medium text-gray-700'>Nothing saved yet.</p>
            <p className='text-sm text-gray-500 mt-2'>Tap ☆ on any article to add it to your reading list.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
export default Saved
