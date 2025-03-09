import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaHamburger } from 'react-icons/fa';
import { motion } from 'framer-motion';

function NotFound() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHungry, setIsHungry] = useState(false);

    // Follow mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: (e.clientX - window.innerWidth / 2) / 20,
                y: (e.clientY - window.innerHeight / 2) / 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="text-center">
                {/* Animated 404 Text */}
                <motion.div
                    className="relative"
                    animate={{
                        rotate: [0, -2, 2, -2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <h1 className="text-9xl font-bold text-white opacity-10">404</h1>
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            x: position.x,
                            y: position.y,
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <FaUtensils className="text-6xl text-green-500" />
                            {isHungry && <FaHamburger className="text-4xl text-yellow-500 animate-bounce" />}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Message */}
                <motion.h2
                    className="mt-8 text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Oops! Looks like this page is missing
                </motion.h2>
                
                <motion.p
                    className="text-gray-400 mb-8 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Maybe it went to grab a bite? 🍔
                </motion.p>

                {/* Interactive Elements */}
                <div className="space-y-4">
                    <motion.button
                        className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-400 rounded-lg hover:border-green-500 hover:text-green-500 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsHungry(!isHungry)}
                    >
                        {isHungry ? "I'm Full!" : "I'm Hungry!"}
                    </motion.button>

                    <div className="flex justify-center gap-4 mt-4">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <FaHome />
                                <span>Go Home</span>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Link
                                to="/menu"
                                className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                                <FaUtensils />
                                <span>View Menu</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Easter Egg */}
                <motion.div
                    className="mt-12 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p>Psst! Try moving your mouse around 👀</p>
                </motion.div>
            </div>
        </div>
    );
}

export default NotFound; 