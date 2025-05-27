import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchProductDetails, updateProduct } from '../../redux/slices/productSlice'
import axios from 'axios'

function EditProductPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { selectedProduct, loading, error } = useSelector((state) => state.products)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 5,
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: '',
        material: '',
        gender: '',
        images: [
            // {
            //     url: 'https://picsum.photos/150?random=160'
            // },
            // {
            //     url: 'https://picsum.photos/150?random=60'
            // },
        ]
    })

    // image uploading state
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct)
        }
    }, [selectedProduct])

    function handleChange(e) {
        const { name, value } = e.target
        setProductData((productData) => {
            return {
                ...productData,
                [name]: value
            }
        })
    }

    async function handleImageUpload(e) {
        // because the input element has a type of file, it has a property called files which hold the images
        const file = e.target.files[0]
        // console.log(file);
        const formData = new FormData()
        formData.appen('image', file)
        try {
            setUploading(true)
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData(),
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setProductData((prevData) => {
                return {
                    ...prevData,
                    images: [...prevData.images, { url: data.imageUrl, altText: '' }]
                }
            })
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    function handleSubmit() {
        e.preventDefault()
        dispatch(updateProduct({ id, productData }))
        navigate('/admin/products')
    }

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className='mx-auto p-6 max-w-5xl shadow-md rounded-md'>
            <h2 className="font-bold text-3xl mb-6">Edit Product</h2>
            <form action="" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                    <label
                        htmlFor=""
                        className="block font-semibold mb-2"
                    >Product Name</label>
                    <input
                        type="text"
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        className='rounded-md p-2 w-full border border-gray-300'
                        required
                    />
                </div>

                {/* description */}
                <div className="mb-6">
                    <label
                        htmlFor=""
                        className="block font-semibold mb-2"
                    >Product Description</label>
                    <textarea
                        id=""
                        name="description"
                        value={productData.description}
                        rows={4}
                        required
                        className='w-full border-gray-300 border rounded-md p-2'
                    ></textarea>
                </div>

                {/* Price */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">Price</label>
                    <input
                        type="number"
                        name='price'
                        value={productData.price}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                {/* count in stock */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">Count In Stock</label>
                    <input
                        type="number"
                        name='countInStock'
                        value={productData.countInStock}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                {/* SKU */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">SKU</label>
                    <input
                        type="text"
                        name='sku'
                        value={productData.sku}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                {/* Sizes */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name='sizes'
                        value={productData.sizes.join(',')}
                        onChange={(e) => setProductData((productData) => {
                            return {
                                ...productData,
                                sizes: e.target.value.split(',').map((size) => size.trim())
                            }
                        })}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                {/* Colors */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">Colors (comma-separated)</label>
                    <input
                        type="text"
                        name='colors'
                        value={productData.colors.join(',')}
                        onChange={(e) => setProductData((productData) => {
                            return {
                                ...productData,
                                sizes: e.target.value.split(',').map((color) => color.trim())
                            }
                        })}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                {/* Image upload */}
                <div className="mb-6">
                    <label htmlFor="" className="block font-semibold mb-2">Upload Image</label>
                    <input type="file" name="" id="" onChange={handleImageUpload} />
                    { uploading && <p> Uploading Image...</p>}
                    <div className="flex gap-4 mt-4">
                        {
                            productData.images.map((image, index) => {
                                return <div key={index}>
                                    <img
                                        src={image.url}
                                        alt={image.altText || 'Product Image'}
                                        className='w-20 h-20 object-cover shadow-md rounded-md'
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white py-2 rounded-md hover:bg-green-600 transition-colors bg-green-500"
                >Update Product</button>
            </form>

        </div>
    )
}

export default EditProductPage
