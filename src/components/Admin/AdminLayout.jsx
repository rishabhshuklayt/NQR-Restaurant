import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarComp from './SidebarComp';
import { FaArrowLeft } from 'react-icons/fa';

function AdminLayout() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate to previous page
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full">
                {/* Top Bar with Back Button */}
                <div className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">
                    <button 
                        onClick={goBack}
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        <span>Back</span>
                    </button>
                    
                    <h1 className="text-xl font-semibold text-gray-800">
                        Admin Panel
                    </h1>
                    
                    <div className="flex items-center">
                        <SidebarComp />
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout; 