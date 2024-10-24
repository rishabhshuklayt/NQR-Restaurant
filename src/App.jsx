import React from "react";
import Home from "./components/Pages/Home";
import Cart from "./components/Cart/Cart";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Route, Routes } from "react-router-dom";
import TrackOrder from "./components/Pages/TrackOrder";
import Trending from "./components/Pages/Trending";
import Categories from "./components/Pages/Categories";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
