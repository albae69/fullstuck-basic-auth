const express = require('express')
const auth = require('./auth.router')
const user = require('./user.router')

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)

module.exports = router
