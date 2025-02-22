import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className='border-b border-b-gray-200 '>
      {/* top bar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
    </header>
  )
}
