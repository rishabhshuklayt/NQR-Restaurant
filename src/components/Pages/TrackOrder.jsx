import React from 'react'
import { IoIosTimer } from "react-icons/io";
import { Button } from '../Button/Button';
import { TrackCard } from '../Card';
import { Link } from 'react-router-dom';
import Footnav from '../Fottbar/Footnav'

function TrackOrder() {
  return (
    <div className='bg-slate-100 min-h-screen flex flex-col'>
      <div className='sticky top-0 z-10 w-full bg-white h-11 flex items-center shadow-md'>
        <Link to="/">
          <h2 className='text-xl font-semibold inline-flex items-center gap-2 ml-4'>
            <IoIosTimer size={20} /> Track Order
          </h2>
        </Link>
        <h2 className='ml-auto mr-4 text-green-500'>19:00 mins</h2>
      </div>

      <div className='mt-4 bg-white rounded-md container mx-auto flex-1'>
        <div className='p-4'>
          <h3 className='text-gray-700 font-semibold text-xl'>Your Orders</h3>
          <p className='text-gray-600 text-xs'>Preparing Your Delicious Meal in minutes</p>
        </div>
        <hr />
        <div className='p-4'>
          <TrackCard />
          <TrackCard />
          <TrackCard />
          <TrackCard />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white w-full sm:hidden transition-transform duration-300">
        <Footnav />
      </div>
    </div>
  )
}

export default TrackOrder