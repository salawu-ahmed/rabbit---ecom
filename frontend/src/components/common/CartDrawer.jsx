import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

export default function ({ isOpen, onClose, ref }) {

    return (
        <div
            ref={ref}
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-2/6 h-full bg-white transform shadow-lg transition-transform duration-300 flex flex-col z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose}>
                    <IoMdClose size={25} className='text-gray-600' />
                </button>
            </div>

            {/* Cart content with scrollable area */}
            <div className="flex flex-grow p-4 overflow-y-auto">
                <h2 className='font-semibold mb-4 font-xl'>Your Items</h2>
                {/* cart content */}
                <div></div>
            </div>

            {/* checkout button */}
            <div className="p-4 bg-white sticky bottom-0">
                <button className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
                <p className='text-sm text-gray-400 mt-2 text-center tracking-tighter '>Shipping taxes, Discount calculated at checkout</p>
            </div>
        </div>
    )
}
