import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const cartProducts = [
    {
        id: 1,
        name: 'T-shirt',
        size: 'M',
        quantity: 1,
        color: 'red',
        price: 15,
        image: 'https://picsum.photos/id/1/200?random=1'
    },
    {
        id: 2,
        name: 'T-shirt',
        size: 'M',
        quantity: 1,
        color: 'blue',
        price: 25,
        image: 'https://picsum.photos/200?random=1'
    },
]

export default function CartContents() {
    return (
        <div>
            {
                cartProducts.map((product) => {
                    return (
                        <div key={product.id} className='flex justify-between items-start p-4 border-b'>
                            <div className='flex items-center'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                                <div>
                                    <h3>{product.name}</h3>
                                    <p className='text-sm text-gray-500'>size: {product.size} | color: {product.color}</p>
                                    <div className="flex items-center mt-2">
                                        <button className='font-medium text-xl border rounded px-2 py-1'>-</button>
                                        <span className='mx-4'>{product.quantity}</span>
                                        <button className='font-medium text-xl border rounded px-2 py-1'>+</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>${product.price.toLocaleString()}</p>
                                <RiDeleteBin3Line size={25} className='text-red-600 mt-2'/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
