import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoIosTimer } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Footnav from '../Fottbar/Footnav'


function Categories() {
  return (
    <div className='bg-zinc-100 h-screen'>
         <div className='w-full bg-white h-11 drop-shadow-md justify-between shadow-black flex items-center'>
            <Link to="/">
            <h2 className='text-xl font-semibold inline-flex items-center gap-2 ml-4'> <BiCategory size={20} /> Categories</h2>
            </Link>
            <h2 className='mr-4 text-green-500'> Total-12</h2>
        </div>
        <Footnav />
    </div>
  )
}

export default Categories