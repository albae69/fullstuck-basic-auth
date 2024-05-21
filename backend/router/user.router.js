const express = require('express')
const router = express.Router()

const { getAllUser } = require('../controller/user.controller')

router.get('/all', getAllUser)

module.exports = router
