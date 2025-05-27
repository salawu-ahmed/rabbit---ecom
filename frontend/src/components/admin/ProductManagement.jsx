import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router'
import { deleteProduct, fetchProducts } from '../../redux/slices/adminProductSlice';

function ProductManagement() {
  // const products = [
  //   {
  //     _id: 4568,
  //     name: 'Shirt',
  //     price: 45,
  //     sku: '897797865412'
  //   }
  // ]
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.adminProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  function handleDeleteProduct (productId) {
    if (window.confirm('Are you sure you want to delete the product?')) {
      // console.log('deleting product with ID:', productId);
      dispatch(deleteProduct(productId))
    }
  }

if (loading) {
  return <p>Loading...</p>
}

if (error) {
  return <p>Error: {error}</p>
}

  return (
    <div className='max-w-7xl p-6 mx-auto'>
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-400">
          <thead className="bg-gray-100 tex-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className='border-b cursor-pointer hover:bg-gray-50'>
                    <td className='p-4 text-gray-900 whitespace-nowrap font-medium'>{product.name}</td>
                    <td className='p-4'>{product.price}</td>
                    <td className='p-4'>{product.sku}</td>
                    <td className='p-4'>
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'
                      >Edit</Link>
                      <button 
                      onClick={() => handleDeleteProduct(product._id)}
                      className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                      >Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='p-4 text-center text-gray-400'>No products found.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ProductManagement
