import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchProductsByFilters } from '../redux/slices/productSlice'
import axios from 'axios'

function Home() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)

  useEffect(() => {
    // fetchProducts()
    dispatch(fetchProductsByFilters({
      gender: 'Women',
      category: 'Bottom Wear',
      limit: 8
    }))
  
    // fetch bestseller 
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        )
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchBestSeller()
  }, [dispatch])
  
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>
      { bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>) : (
        <p className='text-center'>Loading best selling product</p>
      )}
      
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
