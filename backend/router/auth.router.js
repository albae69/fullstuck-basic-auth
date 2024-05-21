const express = require('express')
const router = express.Router()

const {
  login,
  register,
  verifyEmail,
} = require('../controller/auth.controller')

router.post('/login', login)
router.post('/register', register)
router.get('/verify/:id', verifyEmail)

module.exports = router
