import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartCard } from "../Card";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";
import { FaShare, FaQrcode, FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSecurePaymentLine, RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineDeliveryDining, MdOutlinePayments } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { QRCodeCanvas } from 'qrcode.react';

function Cart() {
    const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [customerName, setCustomerName] = useState("Guest");
    const [tableNo, setTableNo] = useState("T-12");
    const [orderId, setOrderId] = useState("ORD" + Math.floor(100000 + Math.random() * 900000));
    const [upiId] = useState("8922091211@kotak811");
    const [customerEmail, setCustomerEmail] = useState("");
    
    // Add ref for the online payment section
    const onlinePaymentRef = useRef(null);
    const profileMenuRef = useRef(null);

    // Close profile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleShare = async () => {
        if(navigator.share){
            try {
                await navigator.share({
                    title: 'My Food Order',
                    text: 'Check out my delicious food order from FoodCrafters!',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API not supported in your browser.');
          }
        }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setShowPaymentOptions(false);
        
        // If online payment is selected, scroll to the payment section
        if (method === "onlinePayment") {
            setTimeout(() => {
                onlinePaymentRef.current?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }, 300); // Increased delay for smoother transition
        }
    }

    const openUpiApp = () => {
        // UPI deep link format
        const upiUrl = generateUPIUrl();
        window.location.href = upiUrl;
    }

    // Function to generate UPI payment URL
    const generateUPIUrl = () => {
        const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=FoodCrafters&tn=Order:${orderId}-${customerName}-Table:${tableNo}&am=${total.toFixed(2)}&cu=INR`;
        return upiPaymentUrl;
    };

    // Sample cart data
    const cartItems = [
        { id: 1, name: "Spicy Chicken Burger", price: 12.99, quantity: 2 },
        { id: 2, name: "French Fries (Large)", price: 4.99, quantity: 1 },
        { id: 3, name: "Chocolate Milkshake", price: 5.99, quantity: 1 },
        { id: 4, name: "Veggie Supreme Pizza", price: 14.99, quantity: 1 }
    ];

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = 2.99;
    const total = subtotal + tax + deliveryFee;

  return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex justify-between items-center">
                <NavLink to="/" className="flex items-center space-x-2 text-gray-800 hover:text-green-600 transition-colors">
                    <IoIosArrowRoundBack size={24} />
                    <h1 className="font-semibold text-lg">Cart</h1>
                </NavLink>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleShare}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                    >
                        <FaShare size={16} />
                        <span className="text-sm font-medium">Share</span>
                    </button>
                    
                    {/* Profile Section */}
                    <div className="relative" ref={profileMenuRef}>
                        <button 
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <FaUserCircle size={24} />
                        </button>
                        
                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
                                <div className="p-3 border-b">
                                    <p className="font-medium text-gray-800">{customerName}</p>
                                    <p className="text-xs text-gray-500">Table: {tableNo}</p>
                                </div>
                                <div className="py-1">
                                    <Link to="/profile" className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <CgProfile size={18} />
                                        <span className="text-sm">My Profile</span>
                                    </Link>
                                    <Link to="/settings" className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <IoSettingsOutline size={18} />
                                        <span className="text-sm">Settings</span>
                                    </Link>
                                    <div className="border-t">
                                        <div className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-50 cursor-pointer">
                                            <RiLogoutBoxRLine size={18} />
                                            <span className="text-sm">Logout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-4 md:max-w-2xl md:mx-auto w-full">
                {/* Delivery info */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-2 mt-1">
                            <MdOutlineDeliveryDining size={24} className="text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Delivery in 30-45 min</h2>
                            <p className="text-gray-600 text-sm">Your order of {cartItems.length} items</p>
                        </div>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="bg-white rounded-lg shadow-sm mb-4">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-gray-800">Order Items ({cartItems.length})</h2>
                    </div>
                    <div className="divide-y">
                        {cartItems.map((item) => (
                            <div key={item.id} className="p-2">
                                <CartCard 
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Info */}
                <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
                    <h2 className="font-semibold text-gray-800 mb-3">Order Information</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-gray-600 text-xs mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="border rounded-md px-2 py-1 w-full text-sm"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-gray-600 text-xs mb-1">Table Number</label>
                            <input 
                                type="text" 
                                value={tableNo}
                                readOnly
                                className="border rounded-md px-2 py-1 w-full text-sm bg-gray-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-600 text-xs mb-1">Email (for receipt)</label>
                            <input 
                                type="email" 
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="border rounded-md px-2 py-1 w-full text-sm"
                                placeholder="Enter your email for order receipt"
                            />
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
                    <h2 className="font-semibold text-gray-800 mb-3">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span className="text-green-600">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Options - Show when Online Payment is selected */}
                {paymentMethod === "onlinePayment" && (
                    <div ref={onlinePaymentRef} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
                        {/* Payment Header */}
                        <div className="bg-gradient-to-r from-yellow-500 to-green-500 p-4">
                            <h3 className="text-white text-lg font-semibold text-center">
                                Online Payment
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col items-center">
                                {/* Order Details Card */}
                                <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Order ID</p>
                                            <p className="font-medium text-gray-800">{orderId}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Table No</p>
                                            <p className="font-medium text-gray-800">{tableNo}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Customer</p>
                                            <p className="font-medium text-gray-800">{customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Amount</p>
                                            <p className="font-medium text-green-600">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

                                {/* QR Code */}
                                <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
                                    <div className="relative">
                                        <QRCodeCanvas
                                            value={generateUPIUrl()}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                            className="mx-auto"
                                        />
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-white px-4 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm border">
                                                Scan to Pay
                                            </span>
        </div>
        </div>
      </div>

                                {/* UPI Details */}
                                <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                                    <p className="text-center text-sm text-gray-600 mb-2">UPI ID</p>
                                    <p className="text-center font-medium text-gray-800">{upiId}</p>
                                </div>

                                {/* UPI Button */}
                                <button 
                                    onClick={openUpiApp}
                                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium rounded-lg flex items-center justify-center gap-2"
                                >
                                    <IoWalletOutline size={20} />
                                    <span>Pay with UPI App</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Payment Bar */}
            <div className="sticky bottom-0 bg-white shadow-md border-t p-4 z-20">
                <div className="md:max-w-2xl md:mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                        {/* Payment Method Selection */}
                        <div className="relative">
                            <div 
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                            >
                                <RiSecurePaymentLine size={20} className="text-gray-700" />
                <div>
                                    <div className="flex items-center text-sm font-medium text-gray-800">
                                        Payment Method <IoMdArrowDropdown size={18} className={`transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {paymentMethod === "cashOnDelivery" ? "Cash on delivery" : "Online payment"}
                                    </p>
                                </div>
                 </div>
                
                            {/* Payment Options Dropdown */}
                            {showPaymentOptions && (
                                <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border w-48 overflow-hidden z-30">
                                    <div 
                                        className={`px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50 ${paymentMethod === "cashOnDelivery" ? "bg-green-50" : ""}`}
                                        onClick={() => handlePaymentMethodChange("cashOnDelivery")}
                                    >
                                        <FaMoneyBillWave className={`${paymentMethod === "cashOnDelivery" ? "text-green-600" : "text-gray-600"}`} />
                                        <span className={`text-sm ${paymentMethod === "cashOnDelivery" ? "font-medium text-green-600" : ""}`}>
                                            Pay on Arrival
                                        </span>
                                    </div>
                                    <div 
                                        className={`px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-50 ${paymentMethod === "onlinePayment" ? "bg-green-50" : ""}`}
                                        onClick={() => handlePaymentMethodChange("onlinePayment")}
                                    >
                                        <MdOutlinePayments className={`${paymentMethod === "onlinePayment" ? "text-green-600" : "text-gray-600"}`} />
                                        <span className={`text-sm ${paymentMethod === "onlinePayment" ? "font-medium text-green-600" : ""}`}>
                                            Online Payment
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <button className="bg-green-600 hover:bg-green-700 transition-colors text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                            <span>Place Order • ${total.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default Cart;
