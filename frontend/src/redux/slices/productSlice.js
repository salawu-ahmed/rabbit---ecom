import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { Query } from "mongoose";

// create async thunk to fetch products based on collections and optional filters 
export const fetchProductsByFilters = createAsyncThunk(
    'products/fetchProductsByFilters',
    async ({
        collection,
        size,
        color,
        gender,
        material,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        brand,
        limit
    }) => {
        const query = new URLSearchParams()
        if (collection) query.append('collection', collection)
        if (size) query.append('size', size)
        if (color) query.append('color', color)
        if (gender) query.append('gender', gender)
        if (minPrice) query.append('minPrice', minPrice)
        if (maxPrice) query.append('maxPrice', maxPrice)
        if (material) query.append('material', material)
        if (brand) query.append('brand', brand)
        if (sortBy) query.append('sortBy', sortBy)
        if (search) query.append('search', search)
        if (limit) query.append('limit', limit)
        if (category) query.append('category', category)

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)

        return response.data
    }
)


// create a thunk to fetch a single product using it's id 
const fetchProductDetails = createAsyncThunk(
    'products/fetchProductDetails',
    async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        return response.data
    }
)


// create a thunk to update an existing product 
const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, productData }) => {
        const response = await axios.put(`
            ${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        )
        return response.data

    }
)


// create an Async Thunk to fetch similar products 
const fetchSimilarProducts = createAsyncThunk(
    'products/fetchSimilarProducts',
    async (id) => {
        const response = axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        )
        return response.data
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null, // store the details of a single product
        similarProduct: [],
        loading: false,
        error: null,
        filters: {
            category: '',
            size: '',
            color: '',
            gender: '',
            minPrice: '',
            maxPrice: '',
            sortBy: '',
            search: '',
            material: '',
            collection: '',
            brand: ''
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state, action) => {
            state.filters = {
                category: '',
                size: '',
                color: '',
                gender: '',
                minPrice: '',
                maxPrice: '',
                sortBy: '',
                search: '',
                material: '',
                collection: '',
                brand: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // handle fetching products with filter
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false
                state.products = Array.isArray(action.payload) ? action.payload : []
            })
            .addCase(fetchProductsByFilters.pending, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // handle fetching product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProductDetails.pending, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


            // handle updating products
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                const updatedProduct = action.payload
                const index = products.findIndex((product) => product._id === updatedProduct._id)
                if(index !== -1){
                    state.products[index] = updatedProduct
                }
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


            // handle fetching similar products
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchSimilarProducts.pending, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})


const { setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer