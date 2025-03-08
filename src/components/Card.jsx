import React, { useEffect, useState } from "react";
import { Button } from "./Button/Button";
import TripleImage from "./MicroComponents/TripleImage";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Model from "./Models/Model";
import { Link } from "react-router-dom";
import { TbEditCircle } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { Skeleton } from 'primereact/skeleton';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



// function Card() {
//   return (
//     <div className="flex justify-center items-center  ">
//       <div className="border border-zinc-200 border-opacity-85 rounded-md w-40 sm:w-48 bg-white ">
//         <img
//           src="https://picsum.photos/400/800
// "
//           className="w-48 h-44 rounded-md object-cover"
//           alt=""
//           srcset=""
//         />
//         <div className="flex justify-between">
//           <h2 className="text-xl font-bold inline-flex items-center gap-2 ">
//             Card Title{" "}
//             <img
//               src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
//               alt=""
//               srcset=""
//               className="w-4 h-4 rounded-md"
//             />
//           </h2>
//           <h2>$ 2.99</h2>
//         </div>
//         <div className=" flex justify-between  ">
//           {/* <Button value="know more!" style="bg-green-500" /> */}
//           <Model />
//           <Button value="Add to Plate" style="bg-yellow-400" />
//         </div>
//         {/* <p  className="mt-2 text-sm text-zinc-800 overflow-clip">Lorem, ipsum dolor sit amet</p> */}
//       </div>
//     </div>
//   );
// }


function Card() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch meal data using async/await
  const fetchMeal = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMeal(data.meals[0]); // Set the first meal from the response
    } catch (error) {
      console.error("Error fetching meal data:", error);
    } finally {
      setLoading(false); // Stop loading whether successful or failed
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  // Skeleton loading component
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="card-container bg-white w-full rounded-lg overflow-hidden">
          {/* Image skeleton */}
          <Skeleton className="w-full h-32 md:h-40 lg:h-48" />
          
          <div className="p-2 md:p-3">
            <Skeleton width="70%" height="1.2rem" className="mb-1 md:mb-2" />
            <div className="flex justify-between items-center mb-2">
              <Skeleton width="40%" height="1rem" />
              <Skeleton width="20%" height="1rem" />
            </div>
            
            <div className="flex justify-between gap-1 md:gap-2">
              <Skeleton width="48%" height="2rem" borderRadius="0.375rem" />
              <Skeleton width="48%" height="2rem" borderRadius="0.375rem" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="card-container bg-white w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 fade-in">
        <div className="img-hover-zoom">
          <img
            src={meal.strMealThumb}
            className="w-full h-32 md:h-40 lg:h-44 object-cover"
            alt={meal.strMeal}
            loading="lazy"
          />
        </div>
        <div className="p-2 md:p-3">
          <div className="flex justify-between items-center mb-1 md:mb-2">
            <h2 className="text-sm md:text-base font-bold truncate">{meal.strMeal}</h2>
            <Tag value={meal.strCategory === "Vegetarian" ? "Veg" : "Non-Veg"} 
                 severity={meal.strCategory === "Vegetarian" ? "success" : "warning"} 
                 rounded 
                 className="text-xs" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm text-gray-600 truncate">{meal.strArea}</span>
            <span className="font-semibold text-sm md:text-base text-orange-600">${(Math.random() * 10 + 2).toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-1 md:gap-2">
            <Model 
              title={meal.strMeal} 
              image={meal.strMealThumb} 
              type={meal.strCategory} 
              about={meal.strInstructions} 
              ingrediant={meal.strIngredient1} 
            />
            <Button 
              value="Add" 
              icon={<i className="pi pi-shopping-cart"></i>}
              variant="filled"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



function CartCard({ name = "Spicy Chicken Burger", price = 12.99, quantity = 1 }) {
  const [loading, setLoading] = useState(true);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const incrementQuantity = () => {
    setItemQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(prev => prev - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="w-full rounded-lg flex items-center gap-3 p-2 animate-pulse">
        {/* Image skeleton */}
        <div className="bg-gray-200 h-16 w-16 sm:h-20 sm:w-20 rounded-lg flex-shrink-0"></div>
        
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          {/* Price skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {/* Counter skeleton */}
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          {/* Total price skeleton */}
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full rounded-lg flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
        <img 
          src="https://picsum.photos/400/800" 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-800 truncate text-sm sm:text-base">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)} each</p>
      </div>
      
      <div className="flex flex-col items-end justify-between h-full">
        <div className="flex rounded-md overflow-hidden border border-gray-200 text-sm">
          <button 
            className="bg-gray-100 px-2 py-1 hover:bg-red-100 transition-colors flex items-center justify-center"
            onClick={decrementQuantity}
          >
            <FaMinus size={12} className="text-gray-700" />
          </button>
          <span className="bg-white px-3 py-1 flex items-center justify-center min-w-[30px]">
            {itemQuantity}
          </span>
          <button 
            className="bg-gray-100 px-2 py-1 hover:bg-green-100 transition-colors flex items-center justify-center"
            onClick={incrementQuantity}
          >
            <FaPlus size={12} className="text-gray-700" />
          </button>
        </div>
        <p className="font-semibold text-orange-600 mt-1 text-sm sm:text-base">
          ${(price * itemQuantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}



function TrackCard() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="card-container bg-white rounded-lg p-3 flex gap-3 justify-between mb-3 w-full max-w-md">
        {/* Image skeleton */}
        <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />
        
        <div className="flex flex-col justify-center gap-1 flex-1">
          {/* Title skeleton */}
          <Skeleton width="60%" height="1.25rem" className="mb-1" />
          {/* Order ID skeleton */}
          <Skeleton width="40%" height="1rem" className="mb-1" />
          {/* Description skeleton */}
          <Skeleton width="90%" height="0.75rem" />
        </div>
        
        <div className="flex items-center justify-center">
          {/* Status skeleton */}
          <Skeleton width="70px" height="1.75rem" borderRadius="0.375rem" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="card-container bg-white rounded-lg p-3 flex gap-3 justify-between mb-3 w-full max-w-md fade-in">
      <div className="img-hover-zoom w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img src="https://picsum.photos/400/800" className="w-full h-full object-cover" alt="Food order" />
      </div>
      
      <div className="flex flex-col justify-center flex-1">
        <h3 className="font-semibold text-gray-800">Family Feast Combo</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700 font-medium">Order ID: #98987</span>
          <div className="flex items-center text-xs text-orange-600">
            <i className="pi pi-clock mr-1"></i> 5 min
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-orange-500 h-1.5 rounded-full float-animation" style={{ width: '65%' }}></div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Preparing your meal. Almost ready!</p>
      </div>
      
      <div className="flex items-center">
        <span className="status-badge status-accepted">Accepted</span>
      </div>
    </div>
  );
}



function OrderCard() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="card-container bg-white rounded-lg mb-3 w-full max-w-lg mx-auto">
        <div className="p-4">
          <div className="flex gap-3">
            {/* Image skeleton */}
            <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
            
            <div className="flex flex-col justify-center gap-1 flex-1">
              {/* Order details skeleton */}
              <Skeleton width="80%" height="1.25rem" className="mb-1" />
              {/* Table number skeleton */}
              <Skeleton width="40%" height="1rem" className="mb-1" />
              {/* Order ID skeleton */}
              <Skeleton width="55%" height="0.8rem" />
            </div>
          </div>
          
          <div className="flex justify-evenly items-center mt-4 gap-3">
            {/* Button skeletons */}
            <Skeleton width="45%" height="2.5rem" borderRadius="0.375rem" />
            <Skeleton width="45%" height="2.5rem" borderRadius="0.375rem" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card-container bg-white rounded-lg mb-3 w-full max-w-lg mx-auto fade-in">
      <div className="p-4">
        <div className="flex gap-3">
          <div className="img-hover-zoom w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img src="https://picsum.photos/400/800" className="w-full h-full object-cover" alt="Order" />
          </div>
          
          <div className="flex flex-col justify-center flex-1">
            <h3 className="font-semibold text-gray-800">Order: Samosa, Jalebi, 3 more</h3>
            <h4 className="text-gray-700 text-sm mt-1">Table no: 7</h4>
            <p className="text-gray-500 text-xs mt-1">Order ID: #98987</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 gap-3">
          <Button 
            value="Reject" 
            variant="outlined" 
            style="border-2 border-red-500 text-red-500 hover:bg-red-50" 
            fullWidth
          />
          <Button 
            value="Accept" 
            style="bg-orange-500 hover:bg-orange-600" 
            fullWidth
            className="pulse-animation"
          />
        </div>
      </div>
    </div>
  );
}


function EditCard() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="card-container bg-white rounded-lg mb-3 w-full max-w-lg mx-auto">
        <div className="p-3 flex items-center gap-3">
          {/* Image skeleton */}
          <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
          
          <div className="flex flex-col justify-center gap-1 flex-1">
            {/* Title skeleton */}
            <Skeleton width="60%" height="1.25rem" className="mb-1" />
            {/* Description skeleton */}
            <Skeleton width="80%" height="0.8rem" className="mb-1" />
            {/* Price skeleton */}
            <Skeleton width="30%" height="1rem" />
          </div>
          
          <div className="flex gap-2">
            {/* Button skeletons */}
            <Skeleton shape="circle" size="2.75rem" />
            <Skeleton shape="circle" size="2.75rem" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card-container bg-white rounded-lg mb-3 w-full max-w-lg mx-auto fade-in">
      <div className="p-3 flex items-center gap-3">
        <div className="img-hover-zoom h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="https://picsum.photos/400/800"
            className="h-full w-full object-cover"
            alt="Food item"
          />
        </div>
        
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">Big Tasty Pies</h3>
            <Tag value="Bestseller" severity="info" size="small" />
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            Fresh baked pies with seasonal fillings
            <Tag value="Veg" severity="success" size="small" />
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-bold text-orange-600">$9.99</p>
            <span className="line-through text-sm text-gray-500">$12.99</span>
            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-medium">-23%</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="h-11 w-11 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors text-white shadow-md">
            <TbEditCircle size={24} />
          </button>
          <button className="h-11 w-11 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors text-white shadow-md">
            <AiFillDelete size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Add a component to display multiple cards with staggered animation
function CardGrid({ children }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 staggered-fade-in">
      {children}
    </div>
  );
}

export { Card, CartCard, TrackCard, OrderCard, EditCard, CardGrid };
