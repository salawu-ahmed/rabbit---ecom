const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkOutRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const subscriberRoutes = require('./routes/subscriberRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productsAdminRoutes = require('./routes/productAdminRoutes')
const ordersAdminRoutes = require('./routes/ordersAdminRoutes')
const serverless = require('serverless-http')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

// database connection
connectDB()


// Default favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Rabbit App')
})
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api', subscriberRoutes)

// Admin
app.use('/api/admin/users', adminRoutes)
app.use('/api/admin/products', productsAdminRoutes)
app.use('/api/admin/orders', ordersAdminRoutes)


// app.listen(process.env.port, () => console.log(`Server running on http://localhost:${process.env.port}`)
//)

module.exports = app