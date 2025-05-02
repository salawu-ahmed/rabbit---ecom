import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router'

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    function toggleSidebar () {
        setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
    }
  return (
    <div className='min-h-screen flex md:flex-row flex-col relative'>
        {/* mobile togglebutton  */}
        <div className="flex text-white z-20 md:hidden p-4 bg-gray-500">
            <button onClick={toggleSidebar}>
                <FaBars size={24}/>
            </button>
            <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
        </div>
        {/* overlay of mobile sidebar */}
        {
            isSidebarOpen && (
                <div className='fixed inset-0 z-10 bg-black/50 md:hidden' onClick={toggleSidebar}></div>
            )
        }

        {/* sidebar */}
        <div className={`w-64 bg-gray-900 text-white absolute md:relative transform min-h-screen ${isSidebarOpen ? 'translate-x-0':'-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
            <AdminSidebar />
        </div>

        {/* main content */}
        <div className="flex-grow p-6 overflow-auto">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout
