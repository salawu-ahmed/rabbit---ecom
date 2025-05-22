import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'

// retrieve user info from localstorage if it is available
const userFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

// check for an existing guestID in the localStorage or generate one
const initialGuestID = localStorage.getItem('guestID') || `guest_${new Date().getTime()}`
localStorage.setItem('guestID', initialGuestID)


// initialState
const initialState = {
    user: userFromStorage,
    guestId: initialGuestID,
    loading: false,
    error: null
}

// Async Thunk for User Login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData)
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        localStorage.setItem('userToken', response.data.token)

        // return the user 
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


// Async Thunk for User Registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData)
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        localStorage.setItem('userToken', response.data.token)

        // return the user 
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.guestId = `guest_${new Date().getTime()}`
            localStorage.removeItem('userInfo')
            localStorage.removeItem('userToken')
            localStorage.setItem('guestId', state.guestId)
        },
        generatenNewGuestId: (state) => {
            state.guestId = `guest_${new DataView().getTime()}`
            localStorage.setItem('guestId', state.guestId)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload.message
            })

            // register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload.message
            })
    }
})


export const { logout, generatenNewGuestId } = authSlice.actions
export default authSlice.reducer