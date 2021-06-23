const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl.js')

// 1) Register a user
router.post('/register', userCtrl.registerUser)

// 2) Log in a user
router.post('/login', userCtrl.loginUser)

// 3) Verify token
router.get('/verify', userCtrl.verifyUser)

module.exports = router
