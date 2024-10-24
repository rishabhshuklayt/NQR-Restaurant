import React from 'react'
import NavComp from './NavComp'

function Navbar() {
  return (
    <div className='bg-orange-500 rounded-b-xl drop-shadow-2xl w-full min-w-full h-28 flex  items-center sm:justify-center mx-auto overflow-x-auto no-scrollbar pl-4'>
        <nav>
            <ul className='flex  gap-10 items-center mb-2 whitespace-nowrap  '>
            <NavComp image="https://c8.alamy.com/comp/2C94T8T/hot-offer-vector-icon-flat-promotion-fire-banner-price-tag-hot-sale-offer-price-season-special-offer-banner-isolated-on-a-white-background-2C94T8T.jpg" title="Top Rated" />
                <NavComp  image="https://img.freepik.com/free-photo/grilled-beef-burger-with-fries-cheese-tomato-generative-ai_188544-8466.jpg" title="French" />
                <NavComp image="https://www.eatingwell.com/thmb/k3RhYf4XhAeqAejYjdInOlSOp6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-1124303516-36413b5bf61f45f1b7d18d90000b56b7.jpg" title="ittalian" />
                <NavComp  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujx5jb6WvhHb7XcW46Rmel1lts4KHWkuBfw&s" title="Chinesse"/>
                <NavComp image="https://static.toiimg.com/thumb/61050397.cms?width=1200&height=900" title="Indian" />
                <NavComp image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrMo0uK-5vfICzug8am1ewHtdiILJgU9j_w&s" title="Beverages" />
                <NavComp image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpYDoMzzfzE_xTrjVhqZ_xar7DbNnIjInXTA&s" title="Coffie/Tea" />
                <NavComp image="https://i.ytimg.com/vi/TkM7p2IxIw8/maxresdefault.jpg" title="Vegies/Curry" />
                <NavComp image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVIMmPq015HLQYH0kXhpbfwMePcJOxUcMyNA&s" title="Dal/pulses" />
                <NavComp image="https://thumbs.dreamstime.com/z/indian-sweets-isolated-white-background-mithai-40182195.jpg" title="Sweets" />
                
               
            </ul>
        </nav>
    </div>
  )
}

export default Navbar