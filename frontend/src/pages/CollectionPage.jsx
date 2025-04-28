import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa6'
import CartDrawer from '../components/common/CartDrawer';
import FilterSidebar from '../components/products/FilterSidebar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';

function CollectionPage() {
    const [products, setProducts] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const sidebarRef = useRef()

    const toggleSidebar = () => {
        setIsSidebarOpen(() => !isSidebarOpen)
    }

    // closes sidebar when click is outside the sidebar
    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false)
        }
    }

    // runs the handleClickOutside when click is detected.
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        // cleans the effects of previous clicks when page reloads.
        return () => (
            document.removeEventListener('mousedown', handleClickOutside)
        )
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const fetchedPoducts = [
                {
                    _id: 1,
                    name: 'Product 1',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=1' }
                    ],
                },
                {
                    _id: 2,
                    name: 'Product 2',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=2' }
                    ],
                },
                {
                    _id: 3,
                    name: 'Product 3',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=3' }
                    ],
                },
                {
                    _id: 4,
                    name: 'Product 4',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=4' }
                    ],
                },
                {
                    _id: 5,
                    name: 'Product 5',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=5' }
                    ],
                },
                {
                    _id: 6,
                    name: 'Product 6',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=6' }
                    ],
                },
                {
                    _id: 7,
                    name: 'Product 7',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=7' }
                    ],
                },
                {
                    _id: 8,
                    name: 'Product 8',
                    price: 100,
                    images: [
                        { url: 'https://picsum.photos/500/500?random=8' }
                    ],
                },
            ]
            setProducts(fetchedPoducts)
        }, 2000);

    }, [])

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* mobile filter buttons */}
            <button
                className="lg:hidden border p-2 flex justify-center items-center"
                onClick={toggleSidebar}
            >
                <FaFilter className='mr-6' /> Filter
            </button>
            {/* filter sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 w-64 lg:w-72 left-0 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collections</h2>

                {/* sort options */}
                <SortOptions />

                {/* product grid */}
                <ProductGrid products={products} />
            </div>

        </div>
    )
}

export default CollectionPage
