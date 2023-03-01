const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const avatarRouter = require('./avatarRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/avatar', avatarRouter)
router.use('/category', categoryRouter)

module.exports = router