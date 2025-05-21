import React, { useState } from 'react'
import { Link } from 'react-router'
import register from '../assets/register.webp'
import { registerUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

function Register() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser({name, email, password}))
        //console.log('user successfully registered', { name, email, password });
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
                            htmlFor="name"
                            className="block text-sm font-semibold mb-2"
                        >Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your name'
                            className='w-full rounded border p-2'
                        />
                    </div>
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
                    <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:text-gray-800 transition">Sign up</button>
                    <p className="mt-6 text-center text-sm">
                        Already have an account?
                        <Link to='/login' className='text-blue-500'>Login</Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={register} alt="Login to account" className='h-[750px] w-full object-center' />
                </div>
            </div>
        </div>
    )
}

export default Register
