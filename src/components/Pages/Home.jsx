import React, { useState } from 'react'
import Topbar from '../Topbar/Topbar'
import {Card, CardGrid} from '../../components/Card'
import Footnav from '../Fottbar/Footnav'
import { CartButton } from '../Button/Button'
import { Route, Routes } from 'react-router-dom'
import Cart from '../Cart/Cart'


function Home() {
    return (
        <>
        <div className='relative bg-zinc-100 min-h-screen'>
            <Topbar />
            
            <div className='px-3 sm:px-4 pt-32 sm:pt-36 pb-24 relative mx-auto max-w-7xl'>
                <CardGrid>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </CardGrid>
            </div>
            
            <div className="bottom-0 fixed bg-zinc-100 w-full sm:hidden transition-transform duration-300">
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