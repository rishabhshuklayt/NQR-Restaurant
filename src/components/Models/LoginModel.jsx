import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

function LoginModel({ isOpen, onClose, onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto flex items-center justify-center py-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-[90%] max-w-md bg-white rounded-xl shadow-xl overflow-hidden mx-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                >
                  <RiCloseLine size={24} />
                </button>
                <div className="flex flex-col items-center">
                  <FaUserCircle size={48} className="mb-2" />
                  <h2 className="text-2xl font-semibold">Welcome Back!</h2>
                  <p className="text-white/80 text-sm">Sign in to continue to FoodCrafters</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 mr-2" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-orange-600 hover:text-orange-700">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-medium"
                >
                  Sign In
                </button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LoginModel; 