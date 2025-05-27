import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice'

function UserMangement() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { users, loading, error } = useSelector((state) => state.admin)
    

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    useEffect(() => {
        if(user && user.role === 'admin') {
            dispatch(fetchUsers())
        }
    }, [dispatch, user])

    // const users = [
    //     {
    //         _id: 15648,
    //         name: 'John Doe',
    //         email: 'john@gmail.com',
    //         role: 'admin'
    //     }
    // ]

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        customer: 'customer'
    })

    function handleChange(e) {
        setFormData((formData) => {
            return {
                ...formData,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addUser(formData))
        
        // reset form after submission
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer'
        })
    }

    function handleRoleChange (user, newRole) {
        // const user = users.filter((user) => user.id == userId)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: newRole
        }        
        dispatch(updateUser(userData))
    }

    function handleDeleteUser (userId) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId))
        }
    }

    // if (loading) {
    //     return <p>Loading</p>
    // }

    // if(error) {
    //     return <p>Error: {error}</p>
    // }
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className="mb-6 font-bold text-2xl">User Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {/* Add a new user form */}
            <div className="p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">Add New User</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray700">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            name='name'
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray700">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            name='email'
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray700">Password</label>
                        <input
                            type="password"
                            value={formData.assword}
                            name='password'
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="" className="block text-gray700">Role</label>
                        <select
                            name="role"
                            id=""
                            value={formData.role}
                            onChange={handleChange}
                            className='w-ful p-2 border rounded'
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-green-500 text-white rounded py-2 px-45 hover:bg-green-600'>Add User</button>
                </form>
            </div>
            {/* user list */}
            <div className="overflow-x-auto sm:rounded-lg shadow-md">
                <table className="text-left min-w-full text-gray-400">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id} className='border-b hover:bg-gray-50'>
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <select 
                                        value={user.role} 
                                        onChange={(e) => handleRoleChange(user, e.target.value)}
                                        className='p-2 border rounded '
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button 
                                        onClick={() => handleDeleteUser(user._id)}
                                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserMangement
