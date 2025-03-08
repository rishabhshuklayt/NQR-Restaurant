import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarComp from "./SidebarComp";
import { VscSearch } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown, MdFilterList } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { EditCard } from "../Card";

// Sample menu data - in a real app, this would come from a database or API
const sampleMenuItems = [
  { id: 1, name: "Big Tasty Pies", description: "Fresh baked pies with seasonal fillings", price: 9.99, category: "Bakery", isVeg: true, isBestseller: true },
  { id: 2, name: "Chicken Burger", description: "Juicy chicken patty with fresh lettuce", price: 7.99, category: "Fast Food", isVeg: false, isBestseller: true },
  { id: 3, name: "Vegetable Pizza", description: "Loaded with fresh vegetables and cheese", price: 12.99, category: "Italian", isVeg: true, isBestseller: false },
  { id: 4, name: "Chocolate Cake", description: "Rich chocolate cake with frosting", price: 5.99, category: "Dessert", isVeg: true, isBestseller: false },
  { id: 5, name: "Green Salad", description: "Fresh garden greens with vinaigrette", price: 4.99, category: "Healthy", isVeg: true, isBestseller: false },
  { id: 6, name: "Fish Tacos", description: "Grilled fish with fresh salsa", price: 8.99, category: "Mexican", isVeg: false, isBestseller: false },
  { id: 7, name: "Mango Smoothie", description: "Refreshing smoothie with fresh mangoes", price: 3.99, category: "Beverages", isVeg: true, isBestseller: false },
  { id: 8, name: "Paneer Tikka", description: "Spiced cottage cheese grilled to perfection", price: 10.99, category: "Indian", isVeg: true, isBestseller: true },
  { id: 9, name: "Beef Steak", description: "Juicy steak with mashed potatoes", price: 14.99, category: "American", isVeg: false, isBestseller: true },
  { id: 10, name: "Sushi Platter", description: "Assorted sushi pieces with soy sauce", price: 16.99, category: "Japanese", isVeg: false, isBestseller: false }
];

function AddItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [filteredItems, setFilteredItems] = useState(sampleMenuItems);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterBestseller, setFilterBestseller] = useState(false);
  
  const categoryDropdownRef = useRef(null);
  
  // Categories extracted from the menu items
  const categories = ["All", ...new Set(sampleMenuItems.map(item => item.category))];

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setShowCategoryDropdown(false);
  };

  // Toggle filters
  const toggleVegFilter = () => {
    setFilterVeg(!filterVeg);
  };

  const toggleBestsellerFilter = () => {
    setFilterBestseller(!filterBestseller);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter items based on search term, selected category and other filters
  useEffect(() => {
    let filtered = menuItems;
    
    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Filter by veg/non-veg
    if (filterVeg) {
      filtered = filtered.filter(item => item.isVeg);
    }
    
    // Filter by bestseller
    if (filterBestseller) {
      filtered = filtered.filter(item => item.isBestseller);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, activeCategory, menuItems, filterVeg, filterBestseller]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 w-full bg-white h-11 flex items-center pl-4 shadow-md">
        <Link to="/">
          <h1>Add items </h1>
        </Link>
        <Link className="ml-auto mr-5">
          <SidebarComp />
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="sm:container sm:mx-auto px-4">
        <div className="relative mt-3">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-white border drop-shadow-sm p-2 w-full rounded-md pl-10"
            placeholder="Search items by name, description, or category"
          />
          <VscSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {/* Category Filter */}
          <div className="relative" ref={categoryDropdownRef}>
            <button 
              className="flex items-center gap-1 px-4 py-2 bg-white rounded-md border shadow-sm hover:bg-gray-50"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className="text-gray-700">Category: {activeCategory}</span>
              <MdOutlineKeyboardArrowDown className={`transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border overflow-hidden">
                {categories.map((category) => (
                  <div 
                    key={category}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeCategory === category ? 'bg-orange-100 text-orange-800 font-medium' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Veg Filter */}
          <button 
            className={`flex items-center gap-1 px-4 py-2 rounded-md border ${filterVeg ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white'}`}
            onClick={toggleVegFilter}
          >
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Veg Only</span>
          </button>
          
          {/* Bestseller Filter */}
          <button 
            className={`flex items-center gap-1 px-4 py-2 rounded-md border ${filterBestseller ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white'}`}
            onClick={toggleBestsellerFilter}
          >
            <span>Bestsellers</span>
          </button>
          
          {/* Filter Counter Badge */}
          {(activeCategory !== "All" || filterVeg || filterBestseller) && (
            <div className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {(activeCategory !== "All" ? 1 : 0) + (filterVeg ? 1 : 0) + (filterBestseller ? 1 : 0)} filters applied
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 container mx-auto flex justify-center px-4">
        <div className="w-full sm:w-96 bg-green-500 h-12 rounded-md flex items-center cursor-pointer hover:bg-green-600 transition-colors">
          <h1 className="ml-4">
            <CiCirclePlus size={35} color="white" />
          </h1>
          <h1 className="justify-center flex-grow text-center text-white font-medium"> Add New Item</h1>
        </div>
      </div>

      {/* Results Section with Count */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="text-gray-600 text-sm">
          Showing {filteredItems.length} of {menuItems.length} items
        </div>
        
        {/* Clear filters button */}
        {(searchTerm || activeCategory !== "All" || filterVeg || filterBestseller) && (
          <button 
            className="text-orange-600 text-sm hover:underline"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("All");
              setFilterVeg(false);
              setFilterBestseller(false);
            }}
          >
            Clear all filters
          </button>
        )}
      </div>
     
      <div className="px-4 py-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No items match your search criteria
          </div>
        ) : (
          filteredItems.map((item) => (
            <CustomEditCard 
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              isVeg={item.isVeg}
              isBestseller={item.isBestseller}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Custom EditCard component that accepts props
function CustomEditCard({ name, description, price, isVeg, isBestseller }) {
  return (
    <div className="card-container bg-white rounded-lg mb-3 w-full max-w-lg mx-auto fade-in">
      <div className="p-3 flex items-center gap-3">
        <div className="img-hover-zoom h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="https://picsum.photos/400/800"
            className="h-full w-full object-cover"
            alt={name}
          />
        </div>
        
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            {isBestseller && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Bestseller</span>}
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            {description}
            {isVeg && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Veg</span>}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-bold text-orange-600">${price.toFixed(2)}</p>
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

export default AddItem;
