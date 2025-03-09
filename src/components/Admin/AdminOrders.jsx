import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingBag, FaHistory, FaClock, FaPrint, FaQrcode, FaEllipsisV, FaSearch, FaFilter, FaRegCalendarAlt } from 'react-icons/fa';
import { MdFastfood, MdOutlineDeliveryDining, MdTableBar, MdPayment, MdAnalytics } from 'react-icons/md';
import { BiExport } from 'react-icons/bi';
import { HiRefresh } from 'react-icons/hi';

function AdminOrders() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('current');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    const tabs = [
        { id: 'current', label: 'Current Orders', icon: FaShoppingBag, count: 6 },
        { id: 'preparing', label: 'Preparing', icon: MdFastfood, count: 4 },
        { id: 'delivering', label: 'Delivering', icon: MdOutlineDeliveryDining, count: 2 },
        { id: 'pending', label: 'Pending', icon: FaClock, count: 3 },
        { id: 'history', label: 'Completed', icon: FaHistory, count: 15 }
    ];

    // Sample orders data
    const orders = [
        { id: 'ORD001', table: 'T-12', status: 'preparing', items: 3, total: 45.99, time: '12:30 PM', customer: 'John Doe' },
        { id: 'ORD002', table: 'T-15', status: 'pending', items: 2, total: 29.99, time: '12:45 PM', customer: 'Alice Smith' },
        { id: 'ORD003', table: 'T-08', status: 'completed', items: 4, total: 62.50, time: '01:15 PM', customer: 'Bob Johnson' },
        { id: 'ORD004', table: 'T-10', status: 'delivering', items: 2, total: 27.50, time: '01:30 PM', customer: 'Emma Wilson' },
        { id: 'ORD005', table: 'T-11', status: 'current', items: 5, total: 83.75, time: '01:45 PM', customer: 'Michael Brown' }
    ];

    // Filter orders based on active tab
    const filteredOrders = orders.filter(order => {
        // Filter by tab
        if (activeTab !== 'all' && order.status !== activeTab) {
            return false;
        }
        
        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                order.id.toLowerCase().includes(query) ||
                order.table.toLowerCase().includes(query) ||
                order.customer.toLowerCase().includes(query)
            );
        }
        
        return true;
    });

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="bg-white p-2 rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <FaEllipsisV />
                    </button>
                </div>

                {/* Order Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrders.map(order => (
                        <div 
                            key={order.id}
                            className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer ${selectedOrder?.id === order.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => handleOrderSelect(order)}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                                    <span className={`px-2 py-1 text-xs rounded-full capitalize
                                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'delivering' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'current' ? 'bg-purple-100 text-purple-800' :
                                        'bg-gray-100 text-gray-800'}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <p>Table: {order.table}</p>
                                    <p>Customer: {order.customer}</p>
                                    <p>Time: {order.time}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 text-sm">{order.items} items</span>
                                    <span className="text-lg font-semibold text-gray-800">${order.total}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className={`fixed top-0 right-0 h-screen bg-white shadow-lg w-80 transform transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="p-4 border-b">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search orders..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            
                            <button 
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="absolute right-3 top-2 p-1 text-gray-400 hover:text-blue-500"
                            >
                                <FaFilter />
                            </button>
                        </div>
                        
                        {filterOpen && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Filter Options</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <FaRegCalendarAlt className="text-gray-400 mr-2" />
                                        <select className="w-full p-2 bg-white border rounded">
                                            <option>Today</option>
                                            <option>Yesterday</option>
                                            <option>Last 7 days</option>
                                            <option>This month</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <MdTableBar className="text-gray-400 mr-2" />
                                        <select className="w-full p-2 bg-white border rounded">
                                            <option>All Tables</option>
                                            <option>T-10</option>
                                            <option>T-11</option>
                                            <option>T-12</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto border-b hide-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center whitespace-nowrap gap-1 py-3 px-3 text-sm font-medium transition-colors
                                    ${activeTab === tab.id 
                                        ? 'text-blue-600 border-b-2 border-blue-600' 
                                        : 'text-gray-500 hover:text-blue-600'}`}
                            >
                                <tab.icon className="text-lg" />
                                <span>{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                                        activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-2 gap-2">
                            <Link 
                                to="/admin/table-qr"
                                className="flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <FaQrcode />
                                <span>Generate QR</span>
                            </Link>
                            <button className="flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <FaPrint />
                                <span>Print Receipt</span>
                            </button>
                        </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="p-4 border-b">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <HiRefresh className="text-blue-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Refresh</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <BiExport className="text-green-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Export</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MdPayment className="text-purple-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Payments</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MdAnalytics className="text-orange-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Analytics</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MdFastfood className="text-yellow-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Menu</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MdTableBar className="text-indigo-600 text-lg mb-1" />
                                <span className="text-xs text-gray-700">Tables</span>
                            </button>
                        </div>
                    </div>

                    {/* Selected Order Details */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {selectedOrder ? (
                            <div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">{selectedOrder.id} Details</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Customer:</span>
                                            <span className="font-medium">{selectedOrder.customer}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Table:</span>
                                            <span className="font-medium">{selectedOrder.table}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <span className={`capitalize font-medium
                                                ${selectedOrder.status === 'completed' ? 'text-green-600' :
                                                selectedOrder.status === 'preparing' ? 'text-yellow-600' :
                                                selectedOrder.status === 'delivering' ? 'text-blue-600' :
                                                'text-gray-600'}`}
                                            >
                                                {selectedOrder.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Time:</span>
                                            <span className="font-medium">{selectedOrder.time}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Items:</span>
                                            <span className="font-medium">{selectedOrder.items}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-medium text-green-600">${selectedOrder.total}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Order Items */}
                                <h3 className="font-medium text-gray-800 mb-2">Items</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between p-2 bg-white border rounded-lg">
                                        <div>
                                            <p className="font-medium">Spicy Chicken Burger</p>
                                            <p className="text-xs text-gray-500">Quantity: 2</p>
                                        </div>
                                        <span className="font-medium">$25.98</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-white border rounded-lg">
                                        <div>
                                            <p className="font-medium">French Fries (Large)</p>
                                            <p className="text-xs text-gray-500">Quantity: 1</p>
                                        </div>
                                        <span className="font-medium">$4.99</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-white border rounded-lg">
                                        <div>
                                            <p className="font-medium">Soft Drink</p>
                                            <p className="text-xs text-gray-500">Quantity: 2</p>
                                        </div>
                                        <span className="font-medium">$3.98</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <FaShoppingBag className="text-gray-300 text-5xl mb-4" />
                                <h3 className="text-gray-500 font-medium">Select an order to view details</h3>
                                <p className="text-gray-400 text-sm mt-2">
                                    No order selected. Click on an order card to view its details.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrders; 