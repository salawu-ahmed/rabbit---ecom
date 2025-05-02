import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/products/ProductDetails'
import Checkout from './components/cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrdersPage from './pages/MyOrdersPage'

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
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='collections/:collection' element={<CollectionPage/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
          <Route path='order/:id' element={<OrderDetailsPage />}/>
          <Route path='my-orders' element={<MyOrdersPage />}/>
        </Route>
        {/* User Routes */}
        {/* Admin Routes */}
      </Routes>
    </BrowserRouter>
  )
}
