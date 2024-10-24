import React from 'react'
import MenuModel from '../Models/MenuModel'
import { Link } from 'react-router-dom'

function Branding() {
  return (
    
    <div className='flex justify-between items-center '>
        {/* <img src="" alt="hello man " srcset="" className='ml-28 w-23 h-14' /> */}
        <h1 className='text-2xl font-semibold sm:ml-28 text-green-500'><span className='text-yellow-500'>Food</span>Crafters</h1>
        <div className='justify-end flex gap-5 text-xl font-semibold mr-3 sm:mr-28'>
          <Link to='/admin'>
        <h1>Orders </h1>
        </Link>
        <MenuModel />
        </div>
    </div>
  )
}

export default Branding