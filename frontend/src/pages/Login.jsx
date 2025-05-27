import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import login from '../assets/login.webp'
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCart } from '../redux/slices/cartSlice'

function Login() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, guestId, loading } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)    

    // get redirect parameter and also check if it is checkout or something else 
    const redirect = new URLSearchParams(location.search).get('redirect') || '/'
    const isCheckoutRedirect = redirect.includes('checkout')

    useEffect(() => {
        if (user) { // when the person logs in
            if (cart?.products.length > 0 && guestId) { // the person has already selected items
                dispatch(mergeCart({ guestId, user })) // merge the guest cart into user cart
                    .then(() => navigate(isCheckoutRedirect ? '/checkout' : '/')) //check whether they came from checkout page and redirect them back or take them to homepage to continue shopping
            } else {
                navigate(isCheckoutRedirect ? '/checkout': '/')
            }
        }
    }, [user, dispatch, guestId, cart, isCheckoutRedirect, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
        // console.log('log in successful', { password, email });
    }

    return (
        <div className='flex'>
            <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} action="" className="w-full bg-white shadow-sm border rounded-lg p-8 max-w-md">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">Rabbit</h2>
                    </div>
                    <h2 className="font-bold text-2xl text-center mb-6"></h2>
                    <p className="text-center mb-6">
                        Enter your username and password to login
                    </p>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold mb-2"
                        >Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='w-full rounded border p-2'
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold mb-2"
                        >Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password'
                            className='w-full rounded border p-2'
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:text-gray-800 transition">{loading ? 'Loading...' : 'Sign in'}</button>
                    <p className="mt-6 text-center text-sm">
                        Don't have an account?
                        <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>Register</Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={login} alt="Login to account" className='h-[750px] w-full object-center' />
                </div>
            </div>
        </div>
    )
}

export default Login
