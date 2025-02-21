import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    function handleSearchToggle() {
        setIsOpen(prev => !prev)
    }

    function handleSearch(e) {
        e.preventDefault()
        console.log(searchTerm);
        handleSearchToggle()
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
                                type='submit'
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                            >
                                <HiMagnifyingGlass
                                    size={25}
                                    className='text-gray-300'
                                />
                            </button>
                        </div>
                        <button
                            type='button'
                            className='absolute top-0 right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
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
