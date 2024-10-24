import React, { useState } from 'react'
import Navbar from './components/NavComps/Navbar'
import {Card,  CartCard } from './components/Card'
import Branding from './components/Brand/Branding'
import Footnav from './components/Fottbar/Footnav'
import { CartButton } from './components/Button/Button'
import { Route, Routes } from 'react-router-dom'
import Cart from './components/Cart/Cart'

function App() {

  return (
  <>
  <div className='relative'>
  <div className='bg-zinc-100 border z-10 fixed top-0 w-full '>
    <Branding />
  </div>
  <div className='w-full justify-center  items-center bg-slate-50 top-8 z-10 fixed '>
   <Navbar />
   </div>
   <div className='flex   sm:gap-7 gap-2 top-40 relative justify-center flex-wrap mt-2 sm:container mx-auto'>
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <CartCard />
   <CartCard />
   <CartCard />
   <CartCard />
  
   </div>
  <div
          className="bottom-0 fixed bg-zinc-100 w-full sm:hidden transition-transform duration-300"
        >
          <Footnav />
        </div>
  </div>
  <div>
  <CartButton />
  </div>
  <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/cart" element={<Cart />} />
        </Routes>
  </>
  )
}

export default App