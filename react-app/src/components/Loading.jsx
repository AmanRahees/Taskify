import React from 'react'

function Loading() {
  return (
    <div className='h-screen bg-black flex justify-center items-center'>
      <div className="w-16 h-16 border-t-2 border-teal-500 border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading;
