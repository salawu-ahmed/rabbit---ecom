import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

function FilterSidebar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100
    })
    const [priceRange, setPriceRange] = useState([0, 100])

    const categories = ['Top Wear', 'Bottom Wear']
    const colors = ['Red', 'Blue', 'Black', 'Yellow', 'Orange', 'Pink', 'Green', 'Purple', 'White']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const materials = ['Cotton', 'Wool', 'Polyester', 'Silk', 'Linen', 'Denim', 'Fleese', 'Viscose']
    const brands = ['Urban Threads', 'Mordern Fit', 'Street Style', 'Beach Breeze', 'Fashionista', 'ChicStyle']
    const genders = ['Male', 'Female']

    useEffect(() => {
        const params = Object.fromEntries([...searchParams])

        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            brand: params.brand ? params.brand.split(',') : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,

        })
        setPriceRange([0, params.maxPrice || 100])
    }, [searchParams])

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target
        const newFilters = { ...filters }
        if (type == 'checkbox') {
            if (checked) {
                // why this line? why the empty array?
                newFilters[name] = [...newFilters[name], value]
                
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        } else {
            newFilters[name] = value
        }

        setFilters(newFilters)
        updateURLParams(newFilters)
    }

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams()
        // iterate through the keys of the newFilters and ....
        Object.keys(newFilters).forEach((key) => {
            // if the value of the key is an array and it is not empty, then....
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                // add the key and it's values separated by a comma to the end of the params or else...
                params.append(key, newFilters[key].join(','))
            } else if (newFilters[key]) {
                // if the key has a value simply appen the key and it's value to params
                // you can't use a simple else statement here because that will add the keys without values as well.
                params.append(key, newFilters[key])
            }
        })
        // set the searchParams to the new parameters 
        setSearchParams(params)
        // then navigate to the new search url 
        navigate(`?${params.toString()}`) // this will navigate you from the current url to baseURL/?params ie ?category=Bottom+Wear&size=XS%2CS comma is represented as %2C
    }

    

    return (
        <div className='p-4'>
            <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
            {/* category filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Category</label>
                {categories.map((category) => (
                    <div
                        key={category}
                        className='flex items-center mb-1'
                    >
                        <input
                            type="radio"
                            name="category"
                            id=""
                            value={category}
                            onChange={handleFilterChange}
                            checked={filters.category === category}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* gender filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Gender</label>
                {genders.map((gender) => (
                    <div
                        key={gender}
                        className='flex items-center mb-1'
                    >
                        <input
                            type="radio"
                            name="gender"
                            id=""
                            value={gender}
                            onChange={handleFilterChange}
                            checked={filters.gender === gender}
                            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/* color filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"

                >Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button key={color}
                            name='color'
                            className={`w-8 h-8 rounded-full border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? 'ring-2 ring-blue-500' : ''}`}
                            style={{
                                backgroundColor: color.toLowerCase()
                            }}
                            value={color}
                            onClick={handleFilterChange}
                            type='button'

                        ></button>
                    ))}
                </div>
            </div>

            {/* size filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Size</label>
                {sizes.map((size) => (
                    <div
                        key={size}
                        className='flex mb-1 items-center'>
                        <input
                            type="checkbox"
                            name="size"
                            id=""
                            value={size}
                            onChange={handleFilterChange}
                            className='mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400'
                            checked={filters.size.includes(size)}
                        />
                        <span className="text-gray-400">{size}</span>
                    </div>
                ))}
            </div>


            {/* material filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Material</label>
                {materials.map((material) => (
                    <div key={material} className='flex mb-1 items-center'>
                        <input
                            type='checkbox'
                            name="material"
                            id=""
                            value={material}
                            onChange={handleFilterChange}
                            checked={filters.material.includes(material)}
                            className='mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400'
                        />
                        <span className="text-gray-400">{material}</span>
                    </div>
                ))}
            </div>


            {/* brand filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Brand</label>
                {brands.map((brand) => (
                    <div
                        key={brand}
                        className='flex mb-1 items-center'>
                        <input
                            type="checkbox"
                            name="brand"
                            id=""
                            value={brand}
                            onChange={handleFilterChange}
                            checked={filters.brand.includes(brand)}
                            className='mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400'
                        />
                        <span className="text-gray-400">{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price range filter */}
            <div className="mb-6">
                <label
                    htmlFor=""
                    className="block text-gray-600 font-medium mb-2"
                >Price Range</label>
                <input
                    type="range"
                    name="priceRange"
                    id=""
                    min={0}
                    max={100}
                    className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
                />
                <div className="flex mt-2 justify-between text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

        </div>
    )
}

export default FilterSidebar
