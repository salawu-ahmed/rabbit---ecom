const mongoose = require('mongoose')

async function connectDB(params) {
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully');
    
 } catch (err) {
    console.error('MongoDB connection failed', err)
    process.exit(1)
 }   
}

module.exports = connectDB