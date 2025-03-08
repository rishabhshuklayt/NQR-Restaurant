import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Button({ value, style, func, icon, disabled, fullWidth, size = "md", variant = "filled" }) {
  // Define base classes
  const baseClasses = "font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2";
  
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  // Variant classes
  const variantClasses = {
    filled: `${style || "bg-orange-500 hover:bg-orange-600 text-white"}`,
    outlined: `${style || "border-2 border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"}`,
    text: "bg-transparent hover:bg-gray-100 text-gray-700"
  };
  
  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";
  
  // Disabled classes
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Combine all classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses}`;
  
  return (
    <button
      onClick={disabled ? null : func}
      className={classes}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {value}
    </button>
  );
}

function CartButton() {
  return (
    <div className="fixed bottom-16 sm:bottom-24 right-4 sm:left-24 z-50">
      <Link to='/cart'>
        <button className="relative flex bg-gradient-to-r from-orange-500 to-orange-600 px-10 sm:px-14 gap-2 sm:gap-4 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="inline-flex">
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 z-0 left-3 sm:left-5 absolute border-white border-2 shadow-md"
            />
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 z-10 absolute left-6 sm:left-9 border-white border-2 shadow-md"
            />
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 z-20 absolute left-9 sm:left-13 border-white border-2 shadow-md"
            />
          </div>
          <div className="ml-14 sm:ml-16">
            <p className="text-xs text-white font-medium">2 items</p>
            <p className="text-sm text-white font-bold">Cart</p>
          </div>
          <div className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white text-orange-600 absolute right-2 flex justify-center items-center shadow-md">
            <FaArrowRightLong className="text-sm sm:text-base" />
          </div>
        </button>
      </Link>
    </div>
  );
}

export { Button, CartButton };
