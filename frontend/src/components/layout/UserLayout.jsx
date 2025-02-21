import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <main className='w-full h-screen'>
        <h2 className="text-5xl">This is the main section of our website </h2>
      </main>
      <Footer />
    </div>
  )
}
