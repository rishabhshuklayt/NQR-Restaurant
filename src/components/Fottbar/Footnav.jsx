import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { MdDiscount } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import Routing from '../../utils/Routing/Routing';
import App from '../../App';
import Cart from '../Cart/Cart';




function Footnav() {
  return (
    <div>
      <div
                className="bottom-0 rounded-md fixed bg-white w-full sm:hidden transition-transform duration-300"
              >
        <ul className='flex gap-4  justify-evenly h-14 items-center'>
            <li >
                <NavLink to='/'><IoHomeOutline size={20} className='bg-yellow-400  ' /> <span className='text-xs'>Home</span>
                </NavLink>
                
            </li>
            <li>
            <NavLink to='/trending' ><IoMdTrendingUp size={20} /> <span className='text-xs'>Trending</span>
            </NavLink>
            </li>
            <li>
            {/* <NavLink><MdDiscount size={20} /> <span className='text-xs'>Offers</span>
            </NavLink> */}
            <NavLink to="/categories" >
            <BiCategory size={20} />
            <span className='text-xs'>Categories</span>
            </NavLink>
            </li>
            <li>
            <NavLink to="/trackOrder"><IoIosTimer size={20} /> <span className='text-xs'>Track  order</span>
            </NavLink>
            </li>
            <li>
            <NavLink to="/cart"><IoCartOutline size={20} /> <span className='text-xs'>Cart</span>
            </NavLink>
            </li>
        </ul>
        
    </div>
    </div>
  )
}

export default Footnav