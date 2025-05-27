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
import AdminLayout from './components/admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserMangement from './components/admin/UserMangement'
import ProductManagement from './components/admin/ProductManagement'
import EditProductPage from './components/admin/EditProductPage'
import OrderManagement from './components/admin/OrderManagement'

import { Provider } from 'react-redux'
import store from './redux/store'
import ProtectedRoute from './components/common/ProtectedRoute'

export default function App() {
  return (
    <Provider store={store}>
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
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='collections/:collection' element={<CollectionPage />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='order-confirmation' element={<OrderConfirmationPage />} />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path='my-orders' element={<MyOrdersPage />} />
          </Route>
          {/* User Routes */}
          {/* Admin Routes */}
          <Route path='/admin' element={
            <ProtectedRoute role='admin'>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminHomePage />} />
            <Route path='users' element={<UserMangement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/:id/edit' element={<EditProductPage />} />
            <Route path='orders' element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
