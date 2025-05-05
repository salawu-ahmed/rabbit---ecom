const jwt = require('jsonwebtoken')
const User = require('../models/User')

// middleware to protect routes 
async function protect (req, res, next) {
    let token;

    // headers is the part of an http request that provides additional info about the request and the client
    if (req.headers['authorization'] && req.headers.authorization.startsWith('Bearer') ) {
        // if a token exist retrieve the token and verify it 
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // once token is verified,
            // use the mongodb model to find the user and 
            req.user = await User.findById(decoded.user._id).select('-password')
            next()
        } catch (error) {
            console.error('Authentication failed: ', error);
            res.status(401).json({message: 'Not authorized, token failed'})
        }
    } else {
        res.status(401).json({
            message: 'Not authorized, no token provided'
        })
    }
}

module.exports = protect