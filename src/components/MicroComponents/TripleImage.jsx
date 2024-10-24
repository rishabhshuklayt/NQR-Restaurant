import React from 'react'

function TripleImage() {
  return (
    <div className=''>
         <div className="inline-flex relative w-10 h-10 bg-green-400">
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
    </div>
  )
}

export default TripleImage