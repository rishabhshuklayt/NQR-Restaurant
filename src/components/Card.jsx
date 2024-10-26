import React, { useEffect, useState } from "react";
import { Button } from "./Button/Button";
import TripleImage from "./MicroComponents/TripleImage";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Model from "./Models/Model";
import { Link } from "react-router-dom";



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

  

  if (loading) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div className="flex justify-center items-center">
      <div className="border border-zinc-200 border-opacity-85 rounded-md w-40 sm:w-48 bg-white">
        <img
          src={meal.strMealThumb}
          className="w-48 h-44 rounded-md object-cover"
          alt={meal.strMeal}
        />
        <div className="flex justify-between p-2">
          <h2 className="text-lg font-bold inline-flex items-center gap-2 truncate ">
            {meal.strMeal}{"... "}
            <img 
              src={`${meal.strCategory === "Vegetarian" ? "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg" : "https://spaces-cdn.clipsafari.com/j1ijpx8yuw3ev0rmtwipup22p0a4"}`}
              alt="Meal icon"
              className="w-4 h-4 rounded-md object-cover"
            />
          </h2>
          <h2>${(Math.random() * 10 + 2).toFixed(2)}</h2> {/* Random price */}
        </div>
        <div className="flex justify-between p-2">
        <div className=" flex justify-between  ">
          {/* <Button value="know more!" style="bg-green-500" /> */}
          <Model title={meal.strMeal} image={meal.strMealThumb} type={meal.strCategory} about={meal.strInstructions} ingrediant={meal.strIngrediant1}  />
          <Button value="Add to Plate" style="bg-yellow-400" />
        </div>
        </div>
      </div>
    </div>
  );
}



function CartCard() {
  return (
    <div className="flex justify-between bg-slate-200 h-20 w-80 rounded-md">
      <div  className="h-20 flex w-24 rounded-lg bg-orange-400
      justify-center items-center  object-cover overflow-hidden" >
      <img src="https://picsum.photos/400/800" alt="" srcset="" className="w-20 h-14 rounded-lg"/>
      </div>
      <div className="text-black">
        <h1 className="text-wrap">Title of fooddd</h1>
        <p className="text-zinc-400">Qty:1</p>
      </div>
      <div>
        <div className=" py-1 px-2 bg-green-500  rounded text-white">
          <button className="bg-green-500 rounded py-1 px-2 hover:bg-red-400"><FaMinus size={10}  />
          </button>
          <button className="bg-green-500 rounded py-1 px-2">1</button>
          <button className="bg-green-500 rounded py-1 px-1 hover:bg-green-400"><FaPlus size={10} />
          </button>
        </div>
        <p>Price: $12.99</p>
      </div>
    </div>
  );
}



function TrackCard() {
  return (
    
        <div className='bg-slate-200 rounded-md flex  gap-2 justify-between mb-2 '>
                    <div className='w-20 h-20 rounded-md bg-red-400'>
                        <img src="https://picsum.photos/400/800" className="w-20 h-20 rounded-md bg-red-400 object-cover" alt="" srcset="" />
                        <img src="" alt="" srcset="" />
                        <img src="" alt="" srcset="" />
                    </div>
                    <div>
                        <h3 className='text-gray-800 font-semibold'>OrderName</h3>
                        <h1>Order ID: 98987</h1>
                        <p className='text-gray-600 text-sm'>Preparing your meal. It will take 5 minutes</p>
                    </div>
                    <div >
                        <h1 className='bg-green-600 rounded-md p-1 text-xs text-white'>Accepted</h1>
                    </div>
                   

                </div>
    
  )
}



function OrderCard() {
  return (
    
    <div className="flex justify-center">
    <div className="bg-slate-200 rounded-md mb-2 w-96  ">
    <div className="flex gap-2 p-3 ">
      <div>
        <img src="https://picsum.photos/400/800" className="object-cover w-20 h-20 rounded-md" alt="" srcset="" />
      </div>
      <div>
        Order: Samosa, jalebi, 3 more
        <h1>Table no: 7</h1>
        <h1 className="text-gray-600">Order ID : 98987</h1>
      </div>
      
    </div>
    <div className="flex justify-evenly items-center mt-3 w- pb-2 ">
      
        <Button value="Reject " style=" px-7 py-3 w-32 bg-transparent border-2 border-red-500" />
       
        <Button value="Accept" style="bg-green-500  px-7 py-3 w-32  border-2 border-white" />
        
      </div>
    </div>
    </div>
    
  )
}



export { Card, CartCard, TrackCard, OrderCard };
