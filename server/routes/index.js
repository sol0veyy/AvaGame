const Router = require('express')
const router = new Router()
const avatarRouter = require('./avatarRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/avatar', avatarRouter)

module.exports = router