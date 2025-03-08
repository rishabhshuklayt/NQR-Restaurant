import React from 'react'
import { IoIosTimer, IoMdTrendingUp } from 'react-icons/io'
import { VscSearch } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Footnav from '../Fottbar/Footnav'

function Trending() {
  return (
    <div className='bg-zinc-100 min-h-screen flex flex-col'>
      <div className='sticky top-0 z-10 w-full bg-white h-11 flex items-center shadow-md'>
        <Link to="/">
          <h2 className='text-xl font-semibold inline-flex items-center gap-2 ml-4'>
            <IoMdTrendingUp size={20} /> Trending
          </h2>
        </Link>
        <div className='ml-auto mr-4 text-green-500 inline-flex gap-2 items-center cursor-pointer hover:text-green-600 transition-colors'>
          <VscSearch />
          <span>Search</span>
        </div>
      </div>

      <div className="flex-1">
        {/* Add your trending content here */}
      </div>

      <div className="sticky bottom-0 w-full">
        <Footnav />
      </div>
    </div>
  )
}

export default Trending