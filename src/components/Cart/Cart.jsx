import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CartCard } from "../Card";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../Button/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import Model from "../Models/Model";


function Cart() {
    const handleShare = async () =>{
        if(navigator.share){
            try {
                await navigator.share({
                    title: 'Check out this website!',
                    text: 'I found this amazing site, take a look!',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert('Web Share API not supported in your browser.');
          }
        }
  return (
    <div className=" bg-slate-100 h-screen">
      <div className="items-center bg-white border-b-1 h-12 border-zinc-500 shadow-zinc-500 rounded-md drop-shadow-md flex justify-between w-full">
        <NavLink to="/">
          <div className=" ml-4 gap-3 font-bold inline-flex items-center">
            <IoIosArrowRoundBack size={30} />
            <h1>Checkout</h1>
          </div>
        </NavLink>
        <div className="inline-flex items-center font-bold gap-1 mr-4 text-green-500">
          <IoCartOutline />
          <h1 onClick={handleShare}>share</h1>
        </div>
      </div>

      <div className="bg-white mt-4 container mx-auto rounded-lg justify-center ">
        <div className=" ml-5">
          <h2 className="text-2xl font-normal">Arriving in minutes</h2>
          <p className="text-gray-600">Order of 6 items</p>
        </div>
        <hr />
        <div className="flex justify-center h-max">
          <ul className="mt-4   ">
            <li className="mb-2">
              <Link>
                <CartCard />
              </Link>
            </li>
            <li className="mb-2">
              <Link>
                <CartCard />
              </Link>
            </li>
            <li className="mb-2">
              <Link>
                <CartCard />
              </Link>
            </li>
            <li className="mb-2">
              <Link>
                <CartCard />
              </Link>
              <Model />
            </li>
          </ul>
        </div>
      </div>

        <div className="bg-white text-black container mx-auto rounded-md">
            <div className="flex justify-between bottom-0 container fixed rounded-md bg-white w-full">
                <div>
                <h1 className="text-md inline-flex items-center gap-2 ml-4 mt-2">Pay using <IoMdArrowDropdown size={22} />
                </h1>
                 <h1 className="ml-4">cash on arrival</h1>
                 </div>
                
                <button className="py-2 px-4 bg-green-700 rounded-lg text-white inline-flex justify-between items-center  "> <span className="mr-6 text-md">$192.93 <h1>
                    total</h1></span><span className="text-xl font-medium inline-flex">Place Order</span></button>
                
            </div>
        </div>

    </div>
  );
}

export default Cart;
