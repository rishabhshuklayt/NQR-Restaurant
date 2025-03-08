import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

// Import the PrimeReact CSS
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // You can change this to another theme
import { OrderCard } from '../Card';
import { Link } from 'react-router-dom';
import SidebarComp from './SidebarComp';




function Admin() {
    const toast = useRef(null);  // Declare the toast ref

    const showSuccess = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Success',
            detail: 'Login Successful!',
            life: 3000,
        });
    };

    return (
        <div className="card bg-zinc-100 min-h-screen">
            <div className="sticky top-0 z-10 w-full bg-white h-11 flex items-center pl-4 shadow-md">
                <Link to="/">
                    <h1>Welcome Rishabh!</h1>
                </Link>
                <Link className="ml-auto">
                    <SidebarComp />
                </Link>
            </div>
            <div className='bg-white rounded-md container mx-auto'>
                <div className='p-4 mt-4'>
                    <div className='flex gap-3'>
                        <h1 className='text-xl'>Incoming Orders</h1>
                        <div className="flex items-center">
                            <div className="relative flex items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700">Live</span>
                        </div>
                    </div>
                    
                    <p className='text-gray-500'>Receive the Orders</p>
                    <hr />
                </div>
                <div>
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
            </div>
        </div>
    );
}

export default Admin;
