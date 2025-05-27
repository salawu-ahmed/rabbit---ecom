import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrders } from '../redux/slices/orderSlice'
import { useNavigate } from 'react-router'
import { logout } from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice'

function Profile() {
    const {user} = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      if(!user){
        navigate('/login')
      }
    }, [user, navigate])


    function handleLogout () {
        dispatch(logout())
        dispatch(clearCart())
        navigate('/login')
    }
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex-grow contianer mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-8">
                    {/* left side */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
                        <p className="mb-4 text-lg text-gray-600">{user?.email}</p>
                        <button 
                        className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
                        onClick={handleLogout}
                        >Logout</button>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MyOrdersPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
