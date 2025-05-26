import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// helper function to load cart from storage.
function loadCartFromStorage() {
    const storeCart = localStorage.getItem('cart')
    return storeCart ? JSON.parse(storeCart) : { products: [] }
}

// helper function to save cart  to localStorage
function saveCartToStorage(cart) {
    const storeCart = JSON.stringify(cart)
    localStorage.setItem('cart', storeCart)
    console.log(cart);

}

//fetch cart for a user or guest 
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { userId, guestId }
            )
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }

    }
)



// add an item to the cart for a user or guest 
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, size, color, guestId, userId }, rejectWithValue) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    color,
                    size,
                    quantity,
                    guestId,
                    userId
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)


// update the quantity of an item in cart
export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    productId,
                    quantity,
                    size,
                    color,
                    guestId,
                    userId
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.reponse.data)
        }
    }
)


// remove an item from cart
export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const productData = {
                productId: productId,
                size: size,
                color: color,
                guestId: guestId,
                userId: userId
            }
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {data: productData}
            )
            console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.resonse.data)
        }
    }
)


// merge guest cart into user cart 
export const mergeCart = createAsyncThunk(
    'cart/mergeCart',
    async ({ guestId, user }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                { guestId, user },
                {
                    headers: {
                        Authorization: `Bearer${localStorage.getItem('userToken')}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    }, reducers: {
        clearCart: (state) => {
            state.cart = { products: [] }
            localStorage.removeItem('cart')
        }
    },
    extraReducers: (builder) => {
        builder
            // HANDLE FETCHCART
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'FAILED TO FETCH CART'
            })


            // HANDLE ADDTOCART
            .addCase(addToCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'FAILED TO ADD TO CART'
            })


            // HANDLE UPDATEITEMQUANTITY
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'FAILED TO UPDATE ITEM QUANTITY'
            })


            // HANDLE REMONVE FROM CART
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'FAILED TO REMOVE ITEM FROM CART'
            })


            // HANDLE REMONVE FROM CART
            .addCase(mergeCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'FAILED TO MERGE CART'
            })
    }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer