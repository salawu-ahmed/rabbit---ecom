import React from 'react'
import { Link } from 'react-router'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'
import {FiPhoneCall} from 'react-icons/fi'


export default function Footer() {
  return (
    <div className='border-t py-12'>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-6">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events and amazing offers.
          </p>
          <p className="text-sm mb-6 text-gray-600">
            Signup and get 10% off on your first order
          </p>
          <form action="" className="flex w-full border-t text-sm border-gray-500 rounded-md border-l border-b focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all">
            <input type="email" name="" id="" placeholder='Enter your email' className='px-2' />
            <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Submit</button>
          </form>
        </div>

        {/* shop links */}
        <div>
          <h3 className="text-lg mb-4 text-gray-800">Shop</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Men's top wear</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Women's top wear</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Men's bottom wear</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Women's bottom wear</Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="text-lg mb-4 text-gray-800">Support</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Contact Us</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>About Us</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>FAQs</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Features</Link>
            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center mb-6 space-x-6">
            <a
              href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-graay-500'
            >
              <TbBrandMeta size={25} />
            </a>
            <a
              href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-graay-500'
            >
              <IoLogoInstagram size={25} />
            </a>
            <a
              href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-graay-500'
            >
              <RiTwitterXLine size={25} />
            </a>
          </div>
          <p className="text-gry-500">Call us</p>
          <p>
            <FiPhoneCall size={25} className='inline-block mr-2' />
            +233 30 923 7909
          </p>
        </div>
      </div>

    {/* footer bottom */}
    <div className="container mx-auto mt-12 px-4 pt-6 lg:px-0 border-t border-gray-200">
      <p className='text-gray-500 text-sm tracking-tighter text-center'>
        2025, Salawu Ahmed, All rights reserved.
      </p>
    </div>
    </div>
  )
}
