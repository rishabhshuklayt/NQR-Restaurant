import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function NavComp({image, title, to = "/"}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <NavLink 
        to={to}
        className={({ isActive }) => `group flex flex-col items-center ${isActive ? 'scale-105' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-md transform transition-all duration-300 ease-in-out
          ${isHovered ? 'shadow-lg scale-105 ring-2 ring-yellow-300' : 'ring-2 ring-white/50'}`}
        >
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" 
          />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
            >
              <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-xs font-medium"
              >
                View
              </motion.span>
            </motion.div>
          )}
        </div>
        <motion.h1 
          className={`text-xs sm:text-sm md:text-sm font-medium mt-1 transition-colors duration-200 truncate max-w-[60px] sm:max-w-[70px] text-center
            ${isHovered ? 'text-yellow-200 font-semibold' : 'text-white'}`}
          whileHover={{ scale: 1.1 }}
        >
          {title}
        </motion.h1>
        
        {/* Active Indicator */}
        <motion.div
          className="h-0.5 bg-yellow-300 mt-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.2 }}
        />
      </NavLink>
    </motion.li>
  );
}

export default NavComp;
