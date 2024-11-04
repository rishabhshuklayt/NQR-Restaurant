<div>
      <div className="w-full justify-between  bg-white h-11 flex items-center pl-4 shadow-black drop-shadow-lg">
                <Link to="/">
                <h1>Add items </h1>
                </Link>
                <Link>
                <SidebarComp />
                </Link>
            </div>
        <div className='bg-zinc-200 h-screen flex items-center justify-center'>
            <form action="" className=''>
                <input type="file" className='p-2 w-72 rounded-md ' placeholder="Enter Item" /><br />
                <input type="text" className='p-2 w-72 rounded-md mt-2' placeholder="Enter Title" /><br />
                <input type="number" className='p-2 w-72 rounded-md mt-2' placeholder="Enter Price" /><br />
                <textarea name="" className='p-2 w-72 rounded-md mt-2' id="" placeholder='Enter abouts'></textarea><br />
                <button type="submit">Add Item</button>
            </form>
        </div>
    </div>