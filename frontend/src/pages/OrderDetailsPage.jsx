import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { fetchOrderDetails } from '../redux/slices/orderSlice'

function OrderDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {orderDetails, loading, error} = useSelector((state) => state.orders)

  console.log(orderDetails);
  
  
  useEffect(() => {
    dispatch(fetchOrderDetails(id))
  }, [dispatch, id])

  if (loading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  // useEffect(() => {
  //   const mockOrderDetails = {
  //     _id: id,
  //     createdAt: new Date(),
  //     isPaid: true,
  //     isDelivered: false,
  //     paymentMethod: 'PayPal',
  //     shippingMethod: 'Standard',
  //     shippingAddress: { city: 'New York', country: 'USA' },
  //     orderItems: [
  //       {
  //         productId: '1',
  //         price: 120,
  //         name: 'Stylish Jacket',
  //         image: 'https://picsum.photos/150?random=4',
  //         quantity: 1
  //       },
  //       {
  //         productId: '2',
  //         price: 300,
  //         name: 'Brazillian Tux',
  //         image: 'https://picsum.photos/150?random=3',
  //         quantity: 1
  //       },
  //       {
  //         productId: '23',
  //         price: 150,
  //         name: 'Cotton Socks',
  //         image: 'https://picsum.photos/150?random=46',
  //         quantity: 4
  //       },
  //       {
  //         productId: 'T4968',
  //         price: 20,
  //         name: 'Tie & Pocket Square Combo',
  //         image: 'https://picsum.photos/150?random=19',
  //         quantity: 3
  //       },
  //     ]
  //   }
  //   setOrderDetails(mockOrderDetails)
  // }, [id])


  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {
        !orderDetails ? (
          <p>No orders found</p>
        ) : (
          <div className='p-4 sm:p-6 rounded-lg border'>
            {/* Order info */}
            <div className="flex flex-col sm:flex-row justify-between mb-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">Order ID: {orderDetails._id}</h3>
                <p className="text-gray-600">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-start mt-4 sm:mt-0 sm:items-end">

                <span
                  className={`
                    ${orderDetails.isPaid ? (
                      'bg-green-100 text-green-700'
                    ) : (
                      'bg-red-100 text-red-700'
                    )} rounded-full text-sm px-3 font-medium`
                  }>
                  {orderDetails.isPaid ? 'Approved' : 'Pending'}
                </span>

                <span
                  className={`
                ${orderDetails.isDelivered ? (
                      'bg-green-100 text-green-700'
                    ) : (
                      'bg-yellow-100 text-yellow-700'
                    )} rounded-full text-sm px-3 font-medium`
                  }>
                  {orderDetails.isDelivered ? 'Delivered' : 'Pending Delivery'}
                </span>

              </div>
            </div>
            {/* customer payment and shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                <p>Shipping Method: {orderDetails.shippingMethod}</p>
                <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
              </div>
            </div>
            {/* Product listing */}
            <div className="overflow-x-auto">
              <h4 className="mb-4 font-semibold text-lg">Products</h4>
              <table className="min-w-full text-gray-600 mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4">Unity Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className='border-b'>
                      <td className='py-2 px-4 flex items-center '>
                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover mr-4 rounded-lg'/>
                        {/* linking to the product details page */}
                        <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>{item.name}</Link>
                      </td>

                      <td className="py-2 px-4 text-center">${item.price} </td>
                      <td className="py-2 px-4 text-center">{item.quantity} </td>
                      <td className="py-2 px-4 text-center">${item.price * item.quantity} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* back to profile link */}
            <Link to='/my-orders' className='text-blue-500 hover:underline'>Back to my Orders</Link>
          </div>
        )
      }
    </div>
  )
}

export default OrderDetailsPage
