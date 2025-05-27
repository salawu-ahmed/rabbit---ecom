import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearCart } from '../redux/slices/cartSlice'
// const checkout = {
//     _id: 12334,
//     createdAt: new Date(),
//     checkoutItems: [
//         {
//             productId: '1',
//             name: 'Stylish Jackets',
//             color: 'black',
//             size: 'M',
//             price: 150,
//             quantity: 1,
//             image: 'https://picsum.photos/150?random=6'
//         },
//         {
//             productId: '1',
//             name: 'T-Shirts',
//             color: 'black',
//             size: 'M',
//             price: 150,
//             quantity: 1,
//             image: 'https://picsum.photos/150?random=9'
//         }
//     ],
//     shippingAddress: {
//         address: '123 Fashion Street',
//         city: 'New York',
//         country: 'USA',
//     }
// }

function OrderConfirmationPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { checkout } = useSelector((state) => state.checkout)
    console.log(checkout);
    

    // clear the cart when the order is confirmed 
    useEffect(() => {
      if(checkout && checkout._id){
        dispatch(clearCart())
        localStorage.removeItem('cart')
      } else {
        navigate('/my-orders')
      }
    
    }, [checkout, dispatch, navigate])
    
    function calculateEstimatedDelivery(createdAt) {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate() + 10)
        return orderDate.toLocaleDateString()
    }
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white '>
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">Thank you for your order!</h1>
            {
                checkout && <div className='p-6 rounded-lg border'>
                    <div className="flex justify-between mb-20">
                        {/* Order id and date */}
                        <div>
                            <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
                            <p className="text-gray-400">Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                        </div>
                        {/* Estimated delivery */}
                        <div>
                            <p className="text-emerald-700 text-sm">Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}</p>
                        </div>
                    </div>
                    {/* Ordered Items */}
                    <div className="mb-20">
                        {
                            checkout.checkOutItems?.map((item) => (
                                <div
                                    key={item.productId}
                                    className='flex items-center mb-4'
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className='w-16 h-16 object-cover mr-4 rounded-md'
                                    />
                                    <div>
                                        <h4 className="text-md font-semibold">{item.name}</h4>
                                        <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-md">${item.price}</p>
                                        <p className="text-sm text-gray-500">{item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Payment and Delivery Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className="text-gray-600">Paypal</p>
                        </div>
                        {/* Delivery info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
                            <p className="text-gray-600">
                                {checkout.shippingAddress.address}
                            </p>
                            <p className="text-gray-600">
                                {checkout.shippingAddress.city},
                                {checkout.shippingAddress.country}
                            </p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default OrderConfirmationPage
