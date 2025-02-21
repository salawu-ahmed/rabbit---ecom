import React from 'react'
import { Link } from 'react-router'
import { HiOutlineUser, HiOutlineShoppingBag, HiMenu } from 'react-icons/hi'
import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <>
            <nav className="container flex items-center justify-between py-4 px-6">
                {/* logo - text */}
                <div>
                    <Link to='/' className='text-2xl font-medium'>Rabbit</Link>
                </div>


                {/* center */}
                <div className='hidden md:flex space-x-6 items-center justify-between'>
                    <div className="hidden md:flex space-x-6">
                        <Link to='#' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>for men</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='#' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>for women</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='#' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>top wear</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='#' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>bottom wear</Link>
                    </div>
                </div>


                {/* right */}
                <div className="flex items-center space-x-4">
                    <Link className='hover:text-black'>
                        <HiOutlineUser size={25} className='text-gray-700' />
                    </Link>
                    <button className='relative'>
                        <HiOutlineShoppingBag size={25} />
                        <span className='absolute bg-rabbit-red -top-1 text-white text-xs rounded-full px-2 py-0.5'>4</span>
                    </button>

                    {/* Search componnet */}
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    <button className='md:hidden'>
                        <HiMenu size={25} className='text-gray-700' />
                    </button>
                </div>
            </nav>
        </>
    )
}
