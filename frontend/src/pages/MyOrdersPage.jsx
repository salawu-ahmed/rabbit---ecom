import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchUserOrders } from '../redux/slices/orderSlice'

function MyOrdersPage() {
    // const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orders, loading, error } = useSelector((state) => state.orders)
    function handleRowClick (orderId) {
        navigate(`/order/${orderId}`)
    }

    console.log(orders);
    

    useEffect(() => {
        dispatch(fetchUserOrders())
    }, [dispatch])

    if(loading) {
        return <p>Loading ...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    // useEffect(() => {
    //     // simulate fetching of orders
    //     setTimeout(() => {
    //         const mockOrders = [{
    //             _id: 134512,
    //             createdAt: new Date(),
    //             shippingAddress: {
    //                 city: 'Accra',
    //                 country: 'Ghana',
    //             },
    //             orderItems: [
    //                 {
    //                     name: 'Ball Pen',
    //                     image: '',
    //                 }
    //             ],
    //             totalPrice: 100,
    //             isPaid: false,
    //         },
    //         {
    //             _id: 8795094,
    //             createdAt: new Date(),
    //             shippingAddress: {
    //                 country: 'Ghana',
    //             },
    //             orderItems: [
    //                 {
    //                     name: 'Ball Pen',
    //                     image: '',
    //                 }
    //             ],
    //             totalPrice: 100,
    //             isPaid: false,
    //         }
    //         ]
    //         setOrders(mockOrders)
    //     }, 1000);

    // }, [])

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className="sm:text-2xl text-xl font-bold mb-6">My Orders</h2>
            <div className="relative rounded shadow-md overflow-hidden">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 uppercase text-xs text-gray-700">
                        <tr>
                            <th className="px-4 py-2 sm:py-3">Image</th>
                            <th className="px-4 py-2 sm:py-3">OrderId</th>
                            <th className="px-4 py-2 sm:py-3">Created</th>
                            <th className="px-4 py-2 sm:py-3">Shipping Address</th>
                            <th className="px-4 py-2 sm:py-3">Items</th>
                            <th className="px-4 py-2 sm:py-3">Price</th>
                            <th className="px-4 py-2 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr 
                                    key={order._id} 
                                    onClick={() => handleRowClick(order._id)}
                                    className='cursor-pointer border-b hover:border-gray-50'
                                    >
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                            <img src={order.orderItems[0].image} alt="order image" className='w-10 h-10 object-cover rounded-full sm:w-12 sm:h:12' />
                                        </td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>
                                            {order._id}
                                        </td>

                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                            <span className='mr-2'>{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                                        </td>

                                        <td className='px-2 py-2 sm:px-4 sm:py-4'>
                                            {`${order.shippingAddress?.city}, ${order.shippingAddress?.country}`}
                                        </td>

                                        <td className='px-2 py-2 sm:px-4 sm:py-4'>
                                           {order.orderItems.length}
                                        </td>

                                        <td className='px-2 py-2 sm:px-4 sm:py-4'>
                                            {order.totalPrice}
                                        </td>
                                        <td className='px-2 py-2 sm:px-4 sm:py-4'>
                                            <span className={`${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-2 py-1 rounded-full text-xs sm:text-s font-medium`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='px-4 py-4 text-center text-gray-500'>You dont have any orders</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrdersPage
