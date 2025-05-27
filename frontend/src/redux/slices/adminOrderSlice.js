import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    'adminOrders/fetchAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            console.log(response.data);

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchOrders = createAsyncThunk(
    `adminOrder/fetchOrders`,
    async (_, { rejectWithValue }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
        )
        return response.data
    }
)

// update an order (admin only)
export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            console.log(response.data);
            
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




// delete an order (admin only)
export const deleteOrder = createAsyncThunk(
    'adminOrders/deleteOrder',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
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


const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
                state.totalOrders = action.payload.length
                // calculate totalSales
                state.totalSales = state.orders.reduce((acc, order) => {
                    return acc + order.totalPrice
                }, 0
                )
            })
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = Array.isArray(action.payload) ? action.payload : ['not an arra']
                state.totalOrders = action.payload.length

                // calculate totalSales
                state.totalSales = state.orders.reduce((acc, order) => {
                    return acc + order.totalPrice
                }, 0
                )
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false
                const updatedOrder = action.payload
                const orderIndex = state.orders.findIndex((order) => {
                    order._id === updatedOrder._id
                })
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            // delete Order 
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false
                const deletedOrderId = action.payload
                state.orders = state.orders.filter((order) => {
                    order._id !== deletedOrderId
                })
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default adminOrderSlice.reducer