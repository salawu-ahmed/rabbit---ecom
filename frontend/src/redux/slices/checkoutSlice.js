import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunk to create a checkout session
export const createCheckout = createAsyncThunk(
    'checkout/createCheckout',
    async ({
        checkOutItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    }, { rejectWithValue }) => {        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                {
                    checkOutItems,
                    shippingAddress,
                    paymentMethod,
                    totalPrice
                },
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


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        checkout: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (bulilder) => {
        bulilder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false
                state.checkout = action.payload
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
    }
})

export default checkoutSlice.reducer