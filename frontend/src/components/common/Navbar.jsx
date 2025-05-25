import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { HiOutlineUser, HiOutlineShoppingBag, HiMenu } from 'react-icons/hi'
import SearchBar from './SearchBar'
import CartDrawer from './CartDrawer'
import { IoMdClose } from 'react-icons/io'

export default function Navbar() {
    // refs
    const cartDrawerRef = useRef()
    const mobileNavRef = useRef()

    // states
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const handleClickOutsideElements = useCallback(function handleClickOutsideElements(e) {
        if (isMobileNavOpen && !mobileNavRef.current.contains(e.target)) {
            setIsMobileNavOpen(false)
        }
        if (isCartDrawerOpen && !cartDrawerRef.current.contains(e.target)) {
            setIsCartDrawerOpen(false)
        }
    }, [isCartDrawerOpen, isMobileNavOpen])


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideElements)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideElements)
        }
    }, [handleClickOutsideElements])


    function toggleCartDrawer() {
        setIsCartDrawerOpen(prev => !prev)
    }
    function toggleMobileNav() {
        setIsMobileNavOpen(prev => !prev)
    }


    return (
        <>
            <nav className="container flex items-center justify-between py-4 px-6 ">
                {/* logo - text */}
                <div>
                    <Link to='/' className='text-2xl font-bold'>Rabbit</Link>
                </div>


                {/* center */}
                <div className='hidden md:flex space-x-6 items-center justify-between'>
                    <div className="hidden md:flex space-x-6">
                        <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>for men</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>for women</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>top wear</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>bottom wear</Link>
                    </div>
                </div>


                {/* right */}
                <div className="flex items-center space-x-4">
                    <Link to='/admin' className='rounded block bg-black px-2 text-sm text-white'>
                        admin
                    </Link>
                    <Link className='hover:text-black' to='/profile'>
                        <HiOutlineUser size={25} className='text-gray-700' />
                    </Link>
                    <button
                        className='relative'
                        onClick={toggleCartDrawer}
                    >
                        <HiOutlineShoppingBag size={25} />
                        <span className='absolute bg-rabbit-red -top-1 text-white text-xs rounded-full px-2 py-0.5'>4</span>
                    </button>

                    {/* Search componnet */}
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    <button className='md:hidden' onClick={toggleMobileNav}>
                        <HiMenu size={25} className='text-gray-700' />
                    </button>
                </div>
            </nav>
            <CartDrawer onClose={toggleCartDrawer} isOpen={isCartDrawerOpen} ref={cartDrawerRef} />


            {/* Mobile Navigation */}
            <div
                ref={mobileNavRef}
                className={
                    `h-full w-3/4 bg-white fixed top-0 right-0 shadow-lg transform transition-transform duration-300 sm:hidden z-50
                ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`
                }>
                <div className="flex justify-end p-4">
                    <IoMdClose
                        size={25}
                        className='text-gray-300 hover:text-gray-600 cursor-pointer'
                        onClick={toggleMobileNav}
                    />
                </div>
                <div className="p-4">
                    <h2 className="mb-4 font-bold fontxl">Menu</h2>
                    <nav className="space-y-4">
                        <Link to='/collections/all?gender=Men' onClick={toggleMobileNav} className='text-gray-600 cursor-pointer block hover:text-black text-sm font-medium uppercase'>for men</Link>
                        <Link to='/collections/all?gender=Women' onClick={toggleMobileNav} className='text-gray-600 cursor-pointer block hover:text-black text-sm font-medium uppercase'>for women</Link>
                        <Link to='/collections/all?category=Top Wear' onClick={toggleMobileNav} className='text-gray-600 cursor-pointer block hover:text-black text-sm font-medium uppercase'>top wear</Link>
                        <Link to='/collections/all?category=Bottom Wear' onClick={toggleMobileNav} className='text-gray-600 cursor-pointer block hover:text-black text-sm font-medium uppercase'>bottom wear</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}
