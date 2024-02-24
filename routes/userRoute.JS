const express = require('express')
const router = express.Router()
const { userSignUp, userLogin } = require('../controller/usercontroller');

router.post('/sign-up', userSignUp)
router.post('/log-in', userLogin)

module.exports = router

