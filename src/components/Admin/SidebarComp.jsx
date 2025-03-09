import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaQrcode, FaPlus, FaTrashAlt, FaHome, FaUtensils, FaUsers, FaClipboardList, FaChartPie } from 'react-icons/fa';
import { MdCategory, MdSettings, MdTableRestaurant, MdPayment } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import './SidebarComp.css';

function SidebarComp() {
    const [visibleRight, setVisibleRight] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setVisibleRight(!visibleRight);
    };

    // Main navigation items
    const navItems = [
        { path: "/admin", icon: <FaHome size={20} />, label: "Dashboard" },
        { path: "/admin/orders", icon: <FaClipboardList size={20} />, label: "Orders", badge: "6" },
        { path: "/admin/add-items", icon: <FaPlus size={20} />, label: "Add Items" },
        { path: "/admin/delete-items", icon: <FaTrashAlt size={20} />, label: "Delete Items" },
        { path: "/admin/menu", icon: <FaUtensils size={20} />, label: "Menu Items" },
        { path: "/admin/categories", icon: <MdCategory size={20} />, label: "Categories" },
        { path: "/admin/tables", icon: <MdTableRestaurant size={20} />, label: "Tables" },
        { path: "/admin/users", icon: <FaUsers size={20} />, label: "Users" },
        { path: "/admin/analytics", icon: <FaChartPie size={20} />, label: "Analytics" },
        { path: "/admin/payments", icon: <MdPayment size={20} />, label: "Payments" },
        { path: "/admin/reports", icon: <TbReport size={20} />, label: "Reports" },
        { path: "/admin/settings", icon: <MdSettings size={20} />, label: "Settings" }
    ];

    // Quick action buttons
    const quickActions = [
        { path: "/admin/table-qr", icon: <FaQrcode size={24} />, label: "Generate QR", color: "bg-green-600" },
        { path: "/admin/add-items", icon: <FaPlus size={24} />, label: "Add Item", color: "bg-blue-600" },
        { path: "/admin/orders", icon: <FaClipboardList size={24} />, label: "Orders", color: "bg-orange-600" },
        { path: "/admin/settings", icon: <MdSettings size={24} />, label: "Settings", color: "bg-purple-600" }
    ];

    return (
        <div>
            {/* Button to trigger sidebar */}
            <Button 
                icon="pi pi-bars" 
                className="p-button-rounded p-button-outlined"
                onClick={toggleSidebar}
                aria-label="Toggle Menu"
            />

            {/* Right Sidebar */}
            <Sidebar 
                visible={visibleRight} 
                position="right" 
                onHide={() => setVisibleRight(false)}
                className="admin-sidebar"
                style={{ width: '320px' }}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-green-600 text-white rounded-full p-2 mr-2">
                            <FaUtensils size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 m-0">Admin Panel</h2>
                            <p className="text-sm text-gray-500 m-0">Restaurant Management</p>
                        </div>
                    </div>
                    <Button 
                        icon="pi pi-times" 
                        className="p-button-rounded p-button-text p-button-plain" 
                        onClick={() => setVisibleRight(false)}
                        aria-label="Close"
                    />
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {quickActions.map((action, index) => (
                            <Link 
                                key={index}
                                to={action.path}
                                className="flex flex-col items-center text-center quick-action"
                            >
                                <div className={`${action.color} text-white p-3 rounded-lg mb-2 shadow-sm hover:shadow-md transition-all`}>
                                    {action.icon}
                                </div>
                                <span className="text-xs text-gray-700">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">Navigation</h3>
                    <ul className="space-y-2">
                        {navItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            
                            return (
                                <li key={index}>
                                    <NavLink 
                                        to={item.path}
                                        className={
                                            `flex items-center space-x-3 p-2 rounded-lg transition-colors nav-item ${
                                                isActive 
                                                    ? 'bg-green-50 text-green-700 font-medium active' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        <span className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full badge">
                                                {item.badge}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                {/* Footer */}
                <div className="mt-auto p-4 border-t border-gray-200">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 qr-section">
                        <h4 className="text-blue-800 font-medium mb-2">Generate Table QR Codes</h4>
                        <p className="text-blue-600 text-sm mb-3">Create QR codes for tables to enable easy ordering</p>
                        <Link 
                            to="/admin/table-qr"
                            className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all footer-button"
                        >
                            <FaQrcode className="mr-2" />
                            <span>Generate QR Codes</span>
                        </Link>
                    </div>
                    
                    <div className="flex justify-between">
                        <Link 
                            to="/"
                            className="inline-flex items-center text-gray-700 hover:text-gray-900 footer-button"
                        >
                            <span className="mr-1">←</span>
                            <span>Back to Restaurant</span>
                        </Link>
                        
                        <button className="text-red-600 hover:text-red-800 footer-button">
                            Logout
                        </button>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}

export default SidebarComp;  