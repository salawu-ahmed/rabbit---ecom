const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const User = require('./models/User')
const Cart = require('./models/Cart')
const products = require('./data/product')

dotenv.config()

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI)

// seeding data
async function seedData () {
    try {
        // clear all existing data
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()

        // create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "adminpassword",
            role: "admin"
        })        

        // Assign the default user ID to each product 
        const userID = createdUser._id
        
        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: userID
            }
        })

        // insert the products into the database
        await Product.insertMany(sampleProducts)

        console.log('Products Seeded Successfully');
        process.exit()
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1)
    }
}

seedData()