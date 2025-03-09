import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full">
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout; 