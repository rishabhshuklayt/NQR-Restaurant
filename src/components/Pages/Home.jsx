import React, { useState } from 'react'
import Navbar from '../NavComps/Navbar'
import {Card,  CartCard } from '../../components/Card'
import Branding from '../Brand/Branding'
import Footnav from '../Fottbar/Footnav'
import { CartButton } from '../Button/Button'
import { Route, Routes } from 'react-router-dom'
import Cart from '../Cart/Cart'


function Home() {
    return (
        <>
        <div className='relative bg-zinc-100 h-screen'>
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
        
        </>
        )
}

export default Home