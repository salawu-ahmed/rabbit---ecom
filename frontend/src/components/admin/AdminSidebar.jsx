import React from 'react'
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa6'
import { FaSignOutAlt } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router'

function AdminSidebar() {
    const navigate = useNavigate()
    function handleLogout () {
navigate('/')
    }
    return (
        <div className='p-6'>
            <div className="mb-6">
                <Link to='/admin' className='text-2xl font-medium'>
                    Rabbit
                </Link>
            </div>
            <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
            <nav className="flex flex-col space-y-2">
                <NavLink
                    to='/admin/users'
                    className={(isActive) => isActive ?
                        'bg-gray-700 text-white rounded flex items-center space-x-2 py-3 px-4' :
                        'bg-gray-300 hover:bg-gray-700 text-white rounded px-4 flex items-center space-x-2 py-3'
                    }>
                    <FaUser />
                    <span>Users</span>
                </NavLink>
                <NavLink
                    to='/admin/products'
                    className={(isActive) => isActive ?
                        'bg-gray-700 text-white rounded flex items-center space-x-2 py-3 px-4' :
                        'bg-gray-300 hover:bg-gray-700 text-white rounded px-4 flex items-center space-x-2 py-3'
                    }>
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>
                <NavLink
                    to='/admin/orders'
                    className={(isActive) => isActive ?
                        'bg-gray-700 text-white rounded flex items-center space-x-2 py-3 px-4' :
                        'bg-gray-300 hover:bg-gray-700 text-white rounded px-4 flex items-center space-x-2 py-3'
                    }>
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>
                <NavLink
                    to='/admin/shop'
                    className={(isActive) => isActive ?
                        'bg-gray-700 text-white rounded flex items-center space-x-2 py-3 px-4' :
                        'bg-gray-300 hover:bg-gray-700 text-white rounded px-4 flex items-center space-x-2 py-3'
                    }>
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
            </nav>
            <div className="mt-6">
                <button 
                className='w-full bg-red-400 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center space-x-2 px-4'
                onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
                </div>
        </div>
    )
}

export default AdminSidebar
