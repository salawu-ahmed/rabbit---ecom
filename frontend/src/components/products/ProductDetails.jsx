import React, { useEffect } from 'react'
import { useState } from 'react'

const selectedProduct = {
  name: 'stylish jacket',
  price: 123,
  originalPrice: 145,
  description: 'Perfect for any occassion',
  brand: 'FashionBrand',
  material: 'Leather',
  sizes: ['S', 'M', 'L'],
  colors: ['Red', 'Black'],
  images: [
    {
      url: 'https://picsum.photos/400/400?random=3',
      altText: 'Stylish Jacket'
    },
    {
      url: 'https://picsum.photos/400/400?random=8',
      altText: 'Stylish Jacket'
    },
  ]
}

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(() => selectedProduct.images[0].url)
    }
  }, [selectedProduct])

  return (
    <div className='p-6'>
      <div className="max-w6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnails */}
          <div
            className={
              `hidden md:flex flex-col space-y-4 mr-6 `
            }
          >
            {
              selectedProduct.images.map((image, index) => {
                return <img
                  src={image.url}
                  alt={image.altText}
                  key={index}
                  className={
                    `border cursor-pointer w-20 h-20 object-cover rounded-lg
                     ${mainImage === image.url ? 'border-black' : 'border-gray-200'}`
                  }
                  onClick={() => setMainImage(image.url)}
                />
              })
            }
          </div>
          {/* main image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={selectedProduct.images[0]?.altText}
                className='w-full h-auto rounded-lg object-cover'
              />
            </div>
            {/* mobile thumbnail */}
            <div className=" flex sm:hidden flex-row space-x-4 mb-4 overscroll-x-scroll">
              {
                selectedProduct.images.map((image, index) => {
                  return <img
                    src={image.url}
                    alt={image.altText}
                    key={index}
                    className='border cursor-pointer w-20 h-20 object-cover rounded-lg'
                    onClick={() => setMainImage(image.url)}
                  />
                })
              }
            </div>

            {/* right side  */}
            <div className='md:w-1/2 md:ml-10'>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct?.originalPrice && `${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-400 mb-2">
                $ {selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="mb-4">
                <p className="text-gray-700">
                  Color: <div className="flex gap-2 mt-2">
                    {
                      selectedProduct.colors.map((color) => {
                        return <button
                          className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-4 border-black' : 'border-gray-300'}`}
                          style={{
                            backgroundColor: color.toLowerCase(),
                            filter: 'brightness(0.5'
                          }}
                          onClick={() => setSelectedColor(() => color)}
                        >
                        </button>
                      })}
                  </div>
                </p>
              </div>


              <div className="mb-4">
                <div className="text-gray-700">Size: </div>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => {
                    return <button key={size} className='py-2 border rounded px-4'>{size} </button>
                  })}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                  <span className="text-lg">1</span>
                  <button className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
                </div>
              </div>
              <button className="bg-black text-white py-2 rounded w-full mb-4">Add to Cart</button>
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-gray-600 text-left text-sm">
                  <tbody>
                    <tr>
                      <td className='py-1'>Brand</td>
                      <td className='py-1'>{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className='py-1'>Material</td>
                      <td className='py-1'>{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
