import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaQrcode, FaShoppingCart, FaHistory, FaUserCog, FaPlus } from 'react-icons/fa';
import { MdTrendingUp, MdCategory, MdAdminPanelSettings, MdRestaurantMenu } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';

function Sidebar() {
    const location = useLocation();
    
    const menuItems = [
        { path: '/', icon: FaHome, label: 'Home' },
        { path: '/menu', icon: IoFastFoodOutline, label: 'Menu' },
        { path: '/categories', icon: MdCategory, label: 'Categories' },
        { path: '/trending', icon: MdTrendingUp, label: 'Trending' },
        { path: '/scan-qr', icon: FaQrcode, label: 'Scan QR' },
        { path: '/orders', icon: FaHistory, label: 'Orders' },
        { path: '/cart', icon: FaShoppingCart, label: 'Cart' }
    ];

    const adminItems = [
        { path: '/admin', icon: MdAdminPanelSettings, label: 'Dashboard' },
        { path: '/admin/add-items', icon: FaPlus, label: 'Add Items' },
        { path: '/admin/table-qr', icon: FaQrcode, label: 'Table QR Codes' },
        { path: '/admin/menu', icon: MdRestaurantMenu, label: 'Manage Menu' },
        { path: '/admin/settings', icon: FaUserCog, label: 'Settings' }
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 shadow-lg overflow-y-auto">
            {/* Logo Section */}
            <div className="p-4 border-b">
                <Link to="/" className="flex items-center space-x-2">
                    <FaUtensils className="text-green-600 text-2xl" />
                    <span className="text-xl font-bold text-gray-800">FoodCrafters</span>
                </Link>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-4">
                <div className="px-4 mb-4">
                    <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Menu</h2>
                </div>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-2 px-6 py-2.5 text-sm ${
                                isActive
                                    ? 'text-green-600 bg-green-50 border-r-4 border-green-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors'
                            }`}
                        >
                            <Icon className={`text-lg ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                {/* Admin Section */}
                <div className="mt-8">
                    <div className="px-4 mb-4 flex items-center justify-between">
                        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center">
                            <MdAdminPanelSettings className="mr-1" />
                            Admin Panel
                        </h2>
                        <Link 
                            to="/admin/table-qr"
                            className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center"
                        >
                            <FaQrcode className="mr-1" />
                            Generate QR
                        </Link>
                    </div>
                    {adminItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-2 px-6 py-2.5 text-sm ${
                                    isActive
                                        ? 'text-green-600 bg-green-50 border-r-4 border-green-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors'
                                }`}
                            >
                                <Icon className={`text-lg ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                <p className="text-xs text-gray-600 text-center">© 2024 FoodCrafters</p>
            </div>
        </div>
    );
}

export default Sidebar; 