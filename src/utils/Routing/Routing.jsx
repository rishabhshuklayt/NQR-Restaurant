import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../../App'
import Cart from '../../components/Cart/Cart'

function Routing() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </div>
  )
}

export default Routing