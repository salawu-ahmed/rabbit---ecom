const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
// const productRoutes = require('./routes/productRoutes')
const productRoutes = require('./routes/productRoutes.js')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

// database connection
connectDB()


// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Rabbit App')
})
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)


app.listen(process.env.port, () => console.log(`Server running on http://localhost:${process.env.port}`)
)