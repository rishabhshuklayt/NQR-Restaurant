import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


function Button({ value, style, func }) {
  return (
    <div>
      <button
        onClick={() => {func}}
        className={`px-2 py-1 text-sm ${style} first-letter:text-black font-medium rounded-md`}
      >
        {value}
      </button>
    </div>
  );
}

function CartButton() {
  return (
    <div>
      <div className="fixed bottom-24 left-24">
        <Link to='/cart'>
        <button className=" relative flex bg-green-600 px-14  gap-4 py-2   sm:hidden rounded-r-full rounded-l-full">
          <div className="inline-flex">
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-10 h-10 bg-red-600 z-0 left-5 absolute  border-green-900 border-x-[6px] "
            />
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-10 h-10 bg-red-600 z-10 absolute left-8 border-green-900 border-x-[6px] "
            />
            <img
              src="https://picsum.photos/400/800"
              alt=""
              className="rounded-full w-10 h-10 bg-red-600 z-20  absolute left-11 border-green-900 border-x-[6px]  "
            />
          </div>
          <div className="ml-4">
            <p className="text-xs text-white">2 items</p>
            <p className="text-sm text-white">Cart</p>
          </div>
          <div className="rounded-full w-10 h-10 bg-green-300 absolute right-2 flex justify-center items-center">
            <h1><FaArrowRightLong />
            </h1>
          </div>
        </button>
        </Link>
      </div>
    </div>
  );
}

export { Button, CartButton };
