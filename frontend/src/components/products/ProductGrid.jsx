import React from 'react'
import { Link } from 'react-router'

export default function ProductGrid({products}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
            products.map((product) => {
                return <Link 
                to={`/product/${product._id}`}
                className='block'
                key={product._id}
                >
                    <div className="bg-white p-4 rounded-lg">
                        <div className="mb-4 w-full h-96">
                            <img 
                            src={product.images[0].url} 
                            alt={product.images[0].altText || product.name} 
                            className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h3 className="text-sm mb-2">{product.name}</h3>
                        <p className="text-gray-500 font-medium text-sm tracking-tighter">$ {product.price}</p>
                    </div>
                </Link>
            })
        }
    </div>
  )
}
