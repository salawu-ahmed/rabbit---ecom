import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productSlice'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleSearchToggle() {
        setIsOpen(prev => !prev)
    }

    function handleSearch(e) {
        e.preventDefault()
        dispatch(setFilters({ search: searchTerm }))
        dispatch(fetchProductsByFilters({ search: searchTerm }))
        navigate(`/collections/all?search=${searchTerm}`)
        setIsOpen(false)
    }

    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'}`}>
            {
                isOpen ? (
                    <form
                        className='relative flex items-center justify-center w-full'
                        onSubmit={handleSearch}
                    >
                        <div className="relative w-1/2">
                            <input
                                type="text"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                className='bg-gray-100 pl-2 pr-12 px-4 py-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700'
                                placeholder='Search'
                            />
                            <button
                                type='button'
                                onClick={handleSearchToggle}
                                onKeyDown={(e) => e.key === 'Enter' ? handleSearch(e) : undefined}
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                            >
                                <HiMagnifyingGlass
                                    size={25}
                                    className='text-gray-500'
                                />
                            </button>
                        </div>
                        <button
                            type='button'
                            className='absolute top-0 right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            <HiMiniXMark size={25} />
                        </button>
                    </form>
                ) : (
                    <button onClick={handleSearchToggle}>
                        <HiMagnifyingGlass size={25} />
                    </button>
                )
            }

        </div>
    )
}
