import React, { useState } from 'react';
import { FaTimes, FaShoppingBag, FaHistory, FaClock } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

function OrdersSidebar({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('current');

    const tabs = [
        { id: 'current', label: 'Current Orders', icon: FaShoppingBag },
        { id: 'preparing', label: 'Preparing', icon: MdFastfood },
        { id: 'pending', label: 'Pending', icon: FaClock },
        { id: 'history', label: 'History', icon: FaHistory }
    ];

    // Sample orders data
    const orders = [
        { id: 'ORD001', table: 'T-12', status: 'preparing', items: 3, total: 45.99 },
        { id: 'ORD002', table: 'T-15', status: 'pending', items: 2, total: 29.99 },
        { id: 'ORD003', table: 'T-08', status: 'completed', items: 4, total: 62.50 }
    ];

    return (
        <div className={`fixed top-0 right-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
            <div className="flex flex-col h-full w-80">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors
                                ${activeTab === tab.id 
                                    ? 'text-green-600 border-b-2 border-green-600' 
                                    : 'text-gray-500 hover:text-green-600'}`}
                        >
                            <tab.icon className="text-lg" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div 
                                key={order.id}
                                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium text-gray-800">{order.id}</h3>
                                        <p className="text-sm text-gray-500">Table: {order.table}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full capitalize
                                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-blue-100 text-blue-800'}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">{order.items} items</span>
                                    <span className="font-medium text-gray-800">${order.total}</span>
                                </div>
                                <button className="w-full mt-3 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersSidebar; 