import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import PaypalButton from './PaypalButton'

const cart = {
    products: [
        {
            name: 'Stylish Jacket',
            color: 'Red',
            size: 'M',
            price: 124,
            image: 'https://picsum.photos/150?random=1'
        },
        {
            name: 'Casual Sneakers',
            color: 'Red',
            size: 'M',
            price: 70,
            image: 'https://picsum.photos/150?random=2'
        },
    ],
    totalPrice: 195,
}
function Checkout() {
    const navigate = useNavigate()
    const [checkoutId,setChekoutId] = useState(null)
    const [shippingAdress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    })

    function handleCreateCheckout (e) {
        e.preventDefault()
        setChekoutId(123)
    }

    function handlePaymentSuccess (details) {
        console.log(details);
        navigate('/order-confirmation')
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
                            value='johndoe@gmail.com'
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
                                value={shippingAdress.firstName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAdress,
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
                                value={shippingAdress.lastName}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAdress,
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
                            value={shippingAdress.address}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAdress,
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
                                value={shippingAdress.city}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAdress,
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
                                value={shippingAdress.postalCode}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAdress,
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
                            value={shippingAdress.country}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAdress,
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
                            value={shippingAdress.phoneNumber}
                            onChange={(e) =>
                                setShippingAddress({
                                    ...shippingAdress,
                                    phoneNumber: e.target.value

                                })
                            }
                            required
                            className='w-full p-2 border rounded'
                        />
                    </div>
                    <div className="mb-6">
                        {!checkoutId? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                                {/* paypal component */}
                                <PaypalButton 
                                amount={100} 
                                onSuccess={handlePaymentSuccess} 
                                onError={(err) => alert('Payment Failed. Try again.')}
                                />
                            </div>
                        )
                        }
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Checkout
