import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MenuModel from '../Models/MenuModel';
import NavComp from '../NavComps/NavComp';
import LoginModel from '../Models/LoginModel';
import SignupModel from '../Models/SignupModel';
import { FaUserCircle } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutBoxRLine, RiLoginBoxLine } from 'react-icons/ri';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 1, title: "Top Rated", image: "https://c8.alamy.com/comp/2C94T8T/hot-offer-vector-icon-flat-promotion-fire-banner-price-tag-hot-sale-offer-price-season-special-offer-banner-isolated-on-a-white-background-2C94T8T.jpg", to: "/top-rated" },
  { id: 2, title: "French", image: "https://img.freepik.com/free-photo/grilled-beef-burger-with-fries-cheese-tomato-generative-ai_188544-8466.jpg", to: "/french" },
  { id: 3, title: "Italian", image: "https://www.eatingwell.com/thmb/k3RhYf4XhAeqAejYjdInOlSOp6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-1124303516-36413b5bf61f45f1b7d18d90000b56b7.jpg", to: "/italian" },
  { id: 4, title: "Chinese", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujx5jb6WvhHb7XcW46Rmel1lts4KHWkuBfw&s", to: "/chinese" },
  { id: 5, title: "Indian", image: "https://static.toiimg.com/thumb/61050397.cms?width=1200&height=900", to: "/indian" },
  { id: 6, title: "Beverages", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrMo0uK-5vfICzug8am1ewHtdiILJgU9j_w&s", to: "/beverages" },
  { id: 7, title: "Coffee/Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpYDoMzzfzE_xTrjVhqZ_xar7DbNnIjInXTA&s", to: "/coffee-tea" },
  { id: 8, title: "Veggies/Curry", image: "https://i.ytimg.com/vi/TkM7p2IxIw8/maxresdefault.jpg", to: "/veggies-curry" },
  { id: 9, title: "Dal/Pulses", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVIMmPq015HLQYH0kXhpbfwMePcJOxUcMyNA&s", to: "/dal-pulses" },
  { id: 10, title: "Sweets", image: "https://thumbs.dreamstime.com/z/indian-sweets-isolated-white-background-mithai-40182195.jpg", to: "/sweets" }
];

function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [user, setUser] = useState({
    name: "Guest",
    table: "T-12",
    avatar: null
  });
  
  const profileMenuRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Horizontal scroll with smooth behavior
  const scroll = (scrollOffset) => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleLogin = (credentials) => {
    // Add your login logic here
    console.log('Login:', credentials);
    setIsLoggedIn(true);
    setUser({
      name: "John Doe", // Replace with actual user data
      table: "T-15",
      avatar: null
    });
    setShowLoginModal(false);
    setShowProfileMenu(false);
  };

  const handleSignup = (userData) => {
    // Add your signup logic here
    console.log('Signup:', userData);
    setIsLoggedIn(true);
    setUser({
      name: userData.name,
      table: userData.tableNo,
      avatar: null
    });
    setShowSignupModal(false);
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({
      name: "Guest",
      table: "T-12",
      avatar: null
    });
    setShowProfileMenu(false);
  };

  const openLoginModal = () => {
    setShowProfileMenu(false);
    setShowLoginModal(true);
  };

  const openSignupModal = () => {
    setShowProfileMenu(false);
    setShowSignupModal(true);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Branding Section */}
        <div className={`transition-all duration-300 py-2 px-3 md:py-4 md:px-8 bg-white shadow-md ${scrolled ? 'shadow-lg' : ''}`}>
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-1">
              <h1 className="text-xl md:text-2xl font-bold">
                <span className="text-yellow-500">Food</span>
                <span className="text-green-500">Crafters</span>
              </h1>
            </Link>
            
            <div className="flex gap-3 items-center">
              <Link to="/admin" className="text-gray-700 hover:text-green-500 font-medium transition-colors text-sm md:text-base">
                Orders
              </Link>
              <MenuModel />
              
              {/* Updated Profile Section */}
              <div className="relative" ref={profileMenuRef}>
                <motion.button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserCircle size={24} className={isLoggedIn ? "text-green-500" : "text-gray-600"} />
                </motion.button>
                
                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
                    >
                      <div className="p-3 border-b bg-gradient-to-r from-orange-500 to-amber-500">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-white/80">
                          {isLoggedIn ? `Table: ${user.table}` : "Welcome to FoodCrafters!"}
                        </p>
                      </div>
                      
                      <div className="py-1">
                        {isLoggedIn ? (
                          <>
                            <Link 
                              to="/profile" 
                              className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <CgProfile size={18} />
                              <span className="text-sm">My Profile</span>
                            </Link>
                            <Link 
                              to="/settings" 
                              className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <IoSettingsOutline size={18} />
                              <span className="text-sm">Settings</span>
                            </Link>
                            <div className="border-t">
                              <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-50 cursor-pointer"
                              >
                                <RiLogoutBoxRLine size={18} />
                                <span className="text-sm">Logout</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={openLoginModal}
                              className="w-full px-4 py-2 flex items-center gap-2 text-green-600 hover:bg-gray-50 cursor-pointer"
                            >
                              <RiLoginBoxLine size={18} />
                              <span className="text-sm">Login</span>
                            </button>
                            <button
                              onClick={openSignupModal}
                              className="w-full px-4 py-2 flex items-center gap-2 text-blue-600 hover:bg-gray-50 cursor-pointer"
                            >
                              <HiOutlineUserAdd size={18} />
                              <span className="text-sm">Sign Up</span>
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Categories Section */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg relative">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll(-200)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-r-lg backdrop-blur-sm z-10 transition-all duration-200"
          >
            ←
          </button>
          <button 
            onClick={() => scroll(200)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-l-lg backdrop-blur-sm z-10 transition-all duration-200"
          >
            →
          </button>

          <div className="container mx-auto overflow-x-auto no-scrollbar py-2 md:py-3" ref={navRef}>
            <nav className="flex justify-start pl-3 md:pl-4 md:justify-center">
              <motion.ul 
                className="flex gap-3 md:gap-5 lg:gap-10 items-center whitespace-nowrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {categories.map((category) => (
                  <NavComp 
                    key={category.id}
                    image={category.image}
                    title={category.title}
                    to={category.to}
                  />
                ))}
              </motion.ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModel
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={switchToSignup}
      />

      {/* Signup Modal */}
      <SignupModel
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}

export default Topbar;
