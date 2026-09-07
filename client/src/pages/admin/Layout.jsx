import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext()

    const logout = ()=>{
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <button onClick={()=> navigate('/')} className='text-left cursor-pointer'><div className='text-2xl font-bold tracking-tight text-sky-700'>SkyQuill</div><div className='text-[9px] uppercase tracking-[0.2em] text-sky-500/80'>Publishing Studio</div></button>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />
      </div>
    </>
  )
}

export default Layout
