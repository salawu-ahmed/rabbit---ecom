import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <div>
      {/* top bar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
    </div>
  )
}
