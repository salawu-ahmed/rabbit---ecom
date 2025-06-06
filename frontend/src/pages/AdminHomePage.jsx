import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { fetchProducts } from '../redux/slices/adminProductSlice'
import { fetchAllOrders, fetchOrders } from '../redux/slices/adminOrderSlice'

function AdminHomePage() {
    const dispatch = useDispatch()
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrder)
    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts)
    console.log(orders);
    console.log(totalOrders);
    

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchAllOrders())
        // dispatch(fetchOrders())
    }, [dispatch])
    
    // useEffect(() => {
    //     dispatch(fetchAllOrders())
    //     // dispatch(fetchOrders())
    // }, [dispatch])

    // const orders = [
    //     {
    //         _id: 2254,
    //         user: {
    //             name: 'John Doe'
    //         },
    //         totalPrice: 110,
    //         status: 'Processing',
    //     }
    // ]
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {productsLoading || ordersLoading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className="text-red-500">Error fetching products: {productsError}</p>
            ) :
             ordersError ? (
                <p className="text-red-500">Error fetching orders: {ordersError}</p>
            ) :
             (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">Revenue</h2>
                        <p className="text-2xl">${totalSales.toFixed(2)}</p>
                    </div>
                    <div className="rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">Total Orders</h2>
                        <p className="text-2xl">{totalOrders}</p>
                        <Link to='/admin/orders' className='text-blue-500 hover:underline'>Manage Orders</Link>
                    </div>
                    <div className="rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">Total Products</h2>
                        <p className="text-2xl">{products.length}</p>
                        <Link to='/admin/products' className='text-blue-500 hover:underline'>Manage Orders</Link>
                    </div>
                </div>
            )}
            {/* recent orders table */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-100 uppercase text-gray-700 text-sm">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">User ID</th>
                                <th className="py-3 px-4">Total Price ID</th>
                                <th className="py-3 px-4">Status ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order._id} className='border-b cursor-pointer hover:bg-gray-50'>
                                            <td className='p-4'>{order._id}</td>
                                            <td className='p-4'>{order.user.name}</td>
                                            <td className='p-4'>{order.totalPrice.toFixed(2)}</td>
                                            <td className='p-4'>{order.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className='p-4 text-center text-gray-400'>No recent orders found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AdminHomePage
