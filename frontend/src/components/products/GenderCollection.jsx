import React from 'react'
import mensCollectionImage from '../../assets/mens-collection.webp'
import womensCollectionImage from '../../assets/womens-collection.webp'
import { Link } from 'react-router'

export default function GenderCollection() {
    return (
        <section className='py-16 px-4 lg:px-8'>
            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                <div className="relative flex-1">
                    <img
                        src={womensCollectionImage}
                        alt="Women's Collection"
                        className="w-full h-[700px] object-cover"
                    />
                    <div className="bg-white/90 p-4 bottom-8 left-8 absolute" >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Women's Collection
                        </h2>
                        <Link
                            to='/collections/all?gender=Women'
                            className='text-sm underline text-gray-900'
                        >Shop Now</Link>
                    </div>
                </div>

                {/* Mens Collection */}
                <div className="relative flex-1">
                    <img
                        src={mensCollectionImage}
                        alt="Men's collection"
                        className="w-full h-[700px] object-cover"
                    />
                    <div className="bg-white/90 p-4 bottom-8 left-8 absolute" >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Men's Collection
                        </h2>
                        <Link
                            to='/collections/all?gender=Men'
                            className='text-sm underline text-gray-900'
                        >Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
