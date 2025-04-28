import React from 'react'
import MyOrderPage from './MyOrderPage'

function Profile() {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex-grow contianer mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-8">
                    {/* left side */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">John Doe</h1>
                        <p className="mb-4 text-lg text-gray-600">johndow@gmail.com</p>
                        <button className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded">Logout</button>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MyOrderPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
