import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
    'adminProducts/fetchProducts',
    async ({ rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// addProduct
export const addProduct = createAsyncThunk(
    'adminProducts/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



// updateProduct
export const updateProduct = createAsyncThunk(
    'adminProducts/updateProduct',
    async ({id, productData}, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// deleteProduct
export const deleteProduct = createAsyncThunk(
    'adminProducts/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return id
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetchProducts
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.loading = false
            state.error = action.error.message
        })


        // addProduct
        .addCase(addProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        })
        .addCase(addProduct.rejected, (state) => {
            state.loading = false
            state.error = action.error.message
        })


        // updateProduct
        .addCase(updateProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            const updatedProduct = action.payload
            const productIndex = state.products.findIndex((product) => {
                product._id === updatedProduct._id
            })
            if(productIndex !== -1) {
                state.products[productIndex] = updatedProduct
            }
        })
        .addCase(updateProduct.rejected, (state) => {
            state.loading = false
            state.error = action.error.message
        })


        // deleteProduct
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            const id = action.payload
            state.products.filter((product) => product._id !== id)
        })
        .addCase(deleteProduct.rejected, (state) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default adminProductsSlice.reducer