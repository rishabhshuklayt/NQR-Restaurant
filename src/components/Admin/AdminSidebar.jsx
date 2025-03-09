import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaQrcode, FaUserCog, FaPlus, FaChartBar, FaUsers, FaClipboardList, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdDashboard, MdRestaurantMenu, MdCategory, MdSettings } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

function AdminSidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const adminMenuItems = [
        { path: '/admin', icon: MdDashboard, label: 'Dashboard' },
        { path: '/admin/orders', icon: FaClipboardList, label: 'Orders' },
        { path: '/admin/add-items', icon: FaPlus, label: 'Add Items' },
        { path: '/admin/menu', icon: MdRestaurantMenu, label: 'Menu Items' },
        { path: '/admin/categories', icon: MdCategory, label: 'Categories' },
        { path: '/admin/table-qr', icon: FaQrcode, label: 'Table QR Codes' },
        { path: '/admin/analytics', icon: FaChartBar, label: 'Analytics' },
        { path: '/admin/users', icon: FaUsers, label: 'Users' },
        { path: '/admin/settings', icon: MdSettings, label: 'Settings' }
    ];

    return (
        <div className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-900 min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-50`}>
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 bg-gray-900 text-gray-400 hover:text-green-500 p-1 rounded-full border border-gray-700"
            >
                {isCollapsed ? <FaAngleRight size={16} /> : <FaAngleLeft size={16} />}
            </button>

            {/* Admin Header */}
            <div className="p-4 border-b border-gray-700">
                <Link to="/admin" className="flex items-center space-x-2">
                    <FaUserCog className="text-green-500 text-2xl" />
                    {!isCollapsed && (
                        <div>
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                            <p className="text-xs text-gray-400">Restaurant Management</p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Quick Actions */}
            {!isCollapsed && (
                <div className="p-4 border-b border-gray-700">
                    <Link 
                        to="/admin/table-qr"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                        <FaQrcode />
                        <span>Generate Table QR</span>
                    </Link>
                </div>
            )}

            {/* Menu Items */}
            <nav className="flex-1 py-4">
                <div className="space-y-1">
                    {adminMenuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2 px-6'} py-3 text-sm ${
                                    isActive
                                        ? 'text-green-500 bg-gray-800 border-l-4 border-green-500'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-green-500 transition-colors'
                                }`}
                                title={isCollapsed ? item.label : ''}
                            >
                                <Icon className={`text-lg ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-700">
                <Link 
                    to="/" 
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2 px-4'} py-2 text-sm text-gray-400 hover:text-white transition-colors`}
                    title={isCollapsed ? 'Back to Restaurant' : ''}
                >
                    <BiLogOut className="text-lg" />
                    {!isCollapsed && <span>Back to Restaurant</span>}
                </Link>
            </div>
        </div>
    );
}

export default AdminSidebar; 