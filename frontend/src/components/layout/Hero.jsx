import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router'

function Hero() {
  return (
    <section className='relative'>
      <img
        src={heroImg}
        alt="Rabbit"
        className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
      />
      <div className="absolute inset-0 bg-black/0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter">Vacation <br /> Ready?</h1>
          <p className="text-sm mb-6 tracking-tighter md:text-lg">
            Expolore our vacation ready outfits with fast worldwide shipping.
          </p>
          <Link
            to='#'
            className='text-lg rounded-sm# px-6 py-2 bg-white text-gray-950'
          >Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
