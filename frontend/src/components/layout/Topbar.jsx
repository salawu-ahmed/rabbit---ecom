import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'


export default function Topbar() {
    return (
        <div className=' bg-rabbit-red text-white'>
            <div className="flex container mx-auto justify-between items-center py-3 px-4">
                <div className='hidden md:flex  space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta size={25}/>
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <IoLogoInstagram size={25}/>
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <RiTwitterXLine size={25}/>
                    </a>
                </div>
                <div className="text-sm text-center flex-grow-1">
                    <span>We ship worldwide! - Fast and reliable shipping</span>
                </div>
                <div className="text-sm hidden md:block flex-grow-0">
                    <a href="tel:+233209237909" className='hover:text-gray-300'>
                        <span>+(233) 20 923 7909 </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
