import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice'

function OrderManagement() {
    // const orders = [
    //     {
    //         _id: 5,
    //         user: {
    //             name: 'john doe'
    //         },
    //         totalPrice: 150,
    //         status: 'Processing'
    //     }
    // ]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const { orders, loading, error } = useSelector((state) => state.adminOrder)

    useEffect(() => {
        if(!user || user.role !== 'admin') {
            navigate('/')
        } else {
            dispatch(fetchAllOrders())
        }
    }, [dispatch, user, navigate])

    function handleStatusChange(orderId, status) {
        dispatch(updateOrderStatus({
            id: orderId,
            status: status
        }))

        // console.log({
        //     id: orderId,
        //     status: status
        // });
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p> 
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="font-bold mb-6 text-2xl">
                Order Management
            </h2>
            <div className="sm:rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="text-gray-700 bg-gray-100 uppercase text-xs">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total Price </th>
                            <th className="py-3 px-4">Status </th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className='cursor-pointer hover:bg-gray-50 border-b'
                                    >
                                        <td
                                            className="font-medium p-4 tex-gray-900 whitespace-nowrap">#{order._id}
                                        </td>
                                        <td className="p-4">{order.user.name}</td>
                                        <td className="p-4">{order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">
                                            <select
                                                name="status"
                                                id=""
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className='text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-sm border border-gray-300 block p-2.5'
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleStatusChange(order._id, 'Delivered')}
                                                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                                            >Mark as Delivered</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='text-gray-500 p-4 text-center'>No orders found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrderManagement
