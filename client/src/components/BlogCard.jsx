import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate()
    const { savedIds, toggleSaved } = useAppContext()
    const saved = savedIds.includes(_id)

  return (
    <div className='relative w-full rounded-lg overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-primary/20 duration-300 cursor-pointer bg-white border border-primary/10'>
      <button
        onClick={(e)=>{ e.stopPropagation(); toggleSaved(_id) }}
        aria-label={saved ? 'Remove from saved' : 'Save article'}
        className='absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-lg text-primary hover:scale-105 transition'
      >
        {saved ? '★' : '☆'}
      </button>
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
      </div>
    </div>
    </div>
  )
}

export default BlogCard
