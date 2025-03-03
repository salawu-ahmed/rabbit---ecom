import React from 'react'
import { Link } from 'react-router'
import featured from '../../assets/featured.webp'

function FeaturedCollection() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
            <div className="lg:w-1/2 text-center p-8 lg:text-left">
                <h2 className="font-semibold text-gray-700 mb-2 text-lg">
                    Comfort and Style
                </h2>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Apparel made for your everyday life
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid temporibus magnam et quis odit unde nisi aspernatur quas expedita eaque possimus fugit veritatis amet esse quam, dolores quae asperiores corporis?
                </p>
                <Link to='/collections/all' className='bg-black rounded-lg py-3 px-6 text-lg hover:bg-gray-800 text-white'>Shop Now</Link>
            </div>
            <div className="lg:w-1/2"><img src={featured} alt="Featured" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' /></div>
        </div>
    </section>
  )
}

export default FeaturedCollection
