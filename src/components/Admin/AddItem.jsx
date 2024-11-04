import React from "react";
import { Link } from "react-router-dom";
import SidebarComp from "./SidebarComp";
import { VscSearch } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { EditCard } from "../Card";

function AddItem() {
  return (
    <div>
      <div className="w-full justify-between  bg-white h-11 flex items-center pl-4 shadow-black drop-shadow-lg">
        <Link to="/">
          <h1>Add items </h1>
        </Link>
        <Link className="mr-5">
          <SidebarComp />
        </Link>
      </div>

      <div className="sm:container sm:mx-auto">
        <input
          type="search"
          name=""
          id=""
          className="bg-white border drop-shadow-sm p-2 w-full  mt-2 rounded-md"
          placeholder=" 🔎 search"
        />
      </div>

      <div className="mt-2 container mx-auto flex justify-center">
        <div className="w-96 bg-green-500 h-12 rounded-md flex items-center">
          <h1 className="ml-4">
            <CiCirclePlus size={35} color="green" />
          </h1>
          <h1 className="justify-center ml-24 text-green-950"> Add Items</h1>
        </div>
      </div>
      <div className="p-2 gap-2 flex">
        <button className="px-5 py-1 rounded-3xl bg-red-300">All</button>
        <button className="px-5 py-1 rounded-3xl bg-red-300 inline-flex items-center gap-1">
          categories <MdOutlineKeyboardArrowDown size={20} />
        </button>
      </div>
     
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
      <EditCard />
    </div>
  );
}

export default AddItem;
