import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../cart/CartContents'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export default function ({ isOpen, onClose, ref }) {
    const navigate = useNavigate()

    const { user, guestId } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)
    const userId = user ? user._id : null

    function handleCheckout() {
        onClose()
        if (!user) {
            navigate('/login?redirect=checkout')
        } else {
            navigate('/checkout')
        }
    }

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
            <div className="flex-grow p-4 overflow-y-auto">
                <h2 className='font-semibold mb-4 font-xl'>Your Items</h2>
                {
                    cart && cart?.products?.length > 0 ? (
                        <CartContents cart={cart} userId={userId} guestId={guestId} />
                    ) : (
                        <p>Cart is empty</p>
                    )
                }
                {/* cart content */}
            </div>

            {/* checkout button */}
            <div className="p-4 bg-white sticky bottom-0">
                {
                    cart && cart?.products?.length > 0 && (
                        <>
                            <button
                                className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
                                onClick={handleCheckout}>Checkout</button>
                            <p className='text-sm text-gray-400 mt-2 text-center tracking-tighter '>Shipping taxes, Discount calculated at checkout</p>
                        </>
                    )
                }
            </div>
        </div>
    )
}
