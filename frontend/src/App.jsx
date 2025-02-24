import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      {/* 
    www.rabbit.com/home  
    www.rabbit.com/products  
    www.rabbit.com/cart
    */}
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        {/* User Routes */}
        {/* Admin Routes */}
      </Routes>
    </BrowserRouter>
  )
}
