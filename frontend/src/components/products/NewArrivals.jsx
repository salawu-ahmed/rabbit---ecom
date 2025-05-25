import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router'


export default function NewArrivals() {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                )
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchNewArrivals()
    }, [])

    function scroll(direction) {
        const container = scrollRef.current
        const scrollAmount = direction === 'left' ? -300 : 300
        container.scrollBy({ left: scrollAmount, behaviour: "smooth" })
    }

    function updateScrollButtons() {
        const container = scrollRef.current
        if (container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(() => leftScroll > 0)
            setCanScrollRight(() => rightScrollable)
        }
    }

    function handleMouseDown(e) {
        setIsDragging(true)
        // e.pageX returns the position of the mouse relative to the edge of the document 
        // offsetLeft returns the length between the edge of the document and the left edge of the element
        // hence startX is being updated with the distance between the left edge of the element and the position of the mouse
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    function handleMouseMove(e) {
        if (!isDragging) return
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeft - walk
    }

    function handleMouseUpOrLeave() {
        setIsDragging(false)
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updateScrollButtons)
        }
        return () => container.removeEventListener('scroll', updateScrollButtons)
    }, [newArrivals])
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion
                </p>

                {/* scroll buttons */}
                <div className="flex justify-end space-x-2 mb-2">
                    <button
                        className={`p-2 rounded border ${canScrollLeft ? 'text-black bg-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                    >
                        <FiChevronLeft size={25} />
                    </button>
                    <button
                        className={`p-2 rounded border ${canScrollRight ? 'text-black bg-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                    >
                        <FiChevronRight size={25} />
                    </button>
                </div>

                {/* scrollable content */}
                <div
                    className={`container mx-auto overflow-x-scroll flex space-x-6 relative no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {
                        newArrivals.map((product) => {
                            return (
                                <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        className='w-full h-[400px] object-cover rounded'
                                        draggable='false'
                                    />
                                    <div className="absolute backdrop-blur-md text-white p-4 rounded-b-lg left-0 right-0 bottom-0">
                                        <Link to={`/product/${product._id}`} className='block'>
                                            <h4 className="font-medium">
                                                {product.name}
                                            </h4>
                                            <p className="mt-1">$ {product.price}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
