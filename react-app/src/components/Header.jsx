import React from 'react'

function Header({onLogout, user}) {
  return (
    <nav className="dark:bg-slate-900 fixed w-full z-20 top-0 left-0 border-b border-teal-700 dark:border-teal-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TodoXpert</span>
        </a>
        <div className="flex md:order-2">
            <p className='text-white capitalize pr-5 cursor-default'>Hello, {user.username}</p>
            <button type="button" onClick={onLogout} className="text-white bg-red-600 transition-all hover:scale-105 focus:ring-4 focus:outline-none px-2 py-1 text-sm">
                Logout
            </button>
        </div>
        </div>
    </nav>
  )
}

export default Header
