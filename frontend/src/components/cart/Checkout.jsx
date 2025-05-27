import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import PaypalButton from './PaypalButton'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice'
import axios from 'axios'

// const cart = {
//     products: [
//         {
//             name: 'Stylish Jacket',
//             color: 'Red',
//             size: 'M',
//             price: 124,
//             image: 'https://picsum.photos/150?random=1'
//         },
//         {
//             name: 'Casual Sneakers',
//             color: 'Red',
//             size: 'M',
//             price: 70,
//             image: 'https://picsum.photos/150?random=2'
//         },
//     ],
//     totalPrice: 195,
// }



function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { cart, loading, error } = useSelector((state) => state.cart)

    const [checkoutId, setChekoutId] = useState(null)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    })

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate('/')
        }
    }, [cart, navigate])

    async function handleCreateCheckout(e) {
        e.preventDefault()
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkOutItems: cart.products,
                shippingAddress: shippingAddress,
                paymentMethod: 'Paypal',
                totalPrice: cart.totalPrice
            }))
            if (res.payload && res.payload._id) {
                setChekoutId(res.payload._id)
                console.log(checkoutId);
                console.log('code runned');

            }
            console.log(res);
        }
    }

    async function handlePaymentSuccess(details) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: 'paid', paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            await handleFinalizeCheckout(checkoutId)
        } catch (error) {
            console.error(error);

        }
    }

    async function handleFinalizeCheckout(checkoutId) {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalise`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            navigate('/order-confirmation')
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <p>Loading cart...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* left section */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form action="" onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label
                            htmlFor=""
                            className="block text-gray-700"
                        >Email</label>
                        <input
                            type="email"
                            className='w-full p-4 border rounded'
                            disabled
                            value={user ? user.email : ''}
                        />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid gap-4 grid-cols-2">
                        <div>
                            <label
                                htmlFor=""
                                className="block text-gray-700"
                            >First Name</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                required
                                value={shippingAddress.firstName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        firstName: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor=""
                                className="block text-gray-700"
                            >Last Name</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                required
                                value={shippingAddress.lastName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        lastName: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor=""
                            className="block text-gray-700"
                        >Address</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAddress,
                                    address: e.target.value
                                })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor=""
                                className="block text-gray-700"
                            >City</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                required
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        city: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor=""
                                className="block text-gray-700"
                            >Postal Code</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2"
                                required
                                value={shippingAddress.postalCode}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        postalCode: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor=""
                            className="block text-gray-700"
                        >Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAddress,
                                    country: e.target.value

                                })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor=""
                            className="block text-gray-700"
                        >Phone Number</label>
                        <input
                            type="text"
                            value={shippingAddress.phoneNumber}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAddress,
                                    phoneNumber: e.target.value

                                })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                    </div>
                    <div className="mb-6">
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                                {/* paypal component */}
                                <PaypalButton
                                    amount={cart.totalPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(err) => alert('Payment Failed. Try again.')}
                                />
                            </div>
                        )
                        }
                    </div>
                </form>
            </div>

            {/* Right side */}
            <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className="flex items-start">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-24 object-cover mr-4'
                                />
                                <div>
                                    <h3 className="text-md">{product.name}</h3>
                                    <p className="text-gray-50">Size: {product.size}</p>
                                    <p className="text-gray-50">Color: {product.color}</p>
                                </div>
                            </div>
                            <p className="text-xl">${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <p>Shipping</p>
                    <p>Free</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout
