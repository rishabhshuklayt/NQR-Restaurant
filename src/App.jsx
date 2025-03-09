import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

// Main App Components
import Home from "./components/Pages/Home";
import Cart from "./components/Cart/Cart";
import TrackOrder from "./components/Pages/TrackOrder";
import Trending from "./components/Pages/Trending";
import Categories from "./components/Pages/Categories";
import NotFound from "./components/Pages/NotFound";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import Admin from "./components/Admin/Admin";
import AddItem from "./components/Admin/AddItem";
import TableQRGenerator from './components/Admin/TableQRGenerator';
import AdminOrders from './components/Admin/AdminOrders';

// Main App Layout component
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="w-full">
      <div className="p-4">
        {children}
      </div>
    </div>
  </div>
);

function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        {/* Main app routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/trackOrder" element={<MainLayout><TrackOrder /></MainLayout>} />
        <Route path="/trending" element={<MainLayout><Trending /></MainLayout>} />
        <Route path="/categories" element={<MainLayout><Categories /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="add-items" element={<AddItem />} />
          <Route path="table-qr" element={<TableQRGenerator />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
