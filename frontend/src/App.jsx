import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserLayout from './components/layout/UserLayout'

export default function App() {
  return (
    <BrowserRouter>
    {/* 
    www.rabbit.com/home  
    www.rabbit.com/products  
    www.rabbit.com/cart
    */}
      <Routes>
        <Route path='/' element={<UserLayout/>}/>
        {/* User Routes */}
        {/* Admin Routes */}
      </Routes>
    </BrowserRouter>
  )
}
