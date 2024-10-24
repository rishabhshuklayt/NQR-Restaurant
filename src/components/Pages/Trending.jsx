import React from 'react'
import { IoIosTimer, IoMdTrendingUp } from 'react-icons/io'
import { VscSearch } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Footnav from '../Fottbar/Footnav'

function Trending() {
  return (
    <div className='bg-zinc-100 h-screen'>
         <div className='w-full bg-white h-11 drop-shadow-md justify-between shadow-black flex items-center'>
            <Link to="/">
            <h2 className='text-xl font-semibold inline-flex items-center gap-2 ml-4'> <IoMdTrendingUp size={20} /> Trending</h2>
            </Link>
            <h2 className='mr-4 text-green-500 inline-flex gap-2  items-center'> <VscSearch />
            Search</h2>
        </div>
        <div>
            <Footnav />
        </div>
    </div>
  )
}

export default Trending