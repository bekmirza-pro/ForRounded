const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const postRouter = require('./postRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/category', categoryRouter)
router.use('/post', postRouter)


module.exports = router