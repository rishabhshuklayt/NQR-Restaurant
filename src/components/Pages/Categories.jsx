import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoIosTimer } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Footnav from '../Fottbar/Footnav'

function Categories() {
  return (
    <div className='bg-zinc-100 min-h-screen'>
      <div className='sticky top-0 z-10 w-full bg-white h-11 flex items-center shadow-md'>
        <Link to="/">
          <h2 className='text-xl font-semibold inline-flex items-center gap-2 ml-4'>
            <BiCategory size={20} /> Categories
          </h2>
        </Link>
        <h2 className='ml-auto mr-4 text-green-500'>Total-12</h2>
      </div>
      <div className="flex-1">
        {/* Add your categories content here */}
      </div>
      <div className="fixed bottom-0 w-full">
        <Footnav />
      </div>
    </div>
  )
}

export default Categories