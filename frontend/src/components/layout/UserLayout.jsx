import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet } from 'react-router'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <main>
       <Outlet />
      </main>
      <Footer />
    </div>
  )
}
