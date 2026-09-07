import React from 'react'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const {navigate, token, user, userToken, setUserToken, setUser} = useAppContext()

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <button onClick={()=>navigate('/')} className='text-left cursor-pointer'>
        <span className='text-2xl sm:text-3xl font-bold tracking-tight text-sky-700'>SkyQuill</span>
        <span className='block text-[10px] sm:text-xs uppercase tracking-[0.22em] text-sky-500/80'>Stories in the open sky</span>
      </button>
      <div className='flex items-center gap-2 sm:gap-4'>
        <button onClick={()=>navigate('/saved')} className='hidden sm:block text-sm text-slate-600 hover:text-primary transition cursor-pointer'>Saved</button>
        {userToken && user ? (
          <>
            <span className='hidden md:block text-sm text-slate-500'>Hi, {user.name}</span>
            <button onClick={() => { localStorage.removeItem('userToken'); localStorage.removeItem('user'); setUserToken(null); setUser(null); }}
              className='rounded-full text-sm cursor-pointer border border-primary/30 text-primary px-5 py-2.5 hover:bg-primary/5 transition'>
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={()=>navigate(token ? '/admin' : '/signin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-7 sm:px-10 py-2.5 shadow-sm shadow-sky-300/40'>
            {token ? 'Dashboard' : 'Sign In'}
            <span className='text-base'>→</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
