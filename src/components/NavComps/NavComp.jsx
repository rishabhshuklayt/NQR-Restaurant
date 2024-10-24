import React from "react";
import { NavLink } from "react-router-dom";

function NavComp({image,title}) {
  return (
    <div>

        <ul>
          <li>
            <NavLink>
              <div className="w-20 text-center h-20 rounded-full bg-red-600 justify-center items-center">
                <img src={image} alt="dishes" srcset="" className="w-20 h-20 rounded-full " />
                <h1 className="text-white  font-semibold stroke-black ">{title}</h1>
              </div>
              
            </NavLink>
          </li>
        </ul>
      
    </div>
  );
}

export default NavComp;
