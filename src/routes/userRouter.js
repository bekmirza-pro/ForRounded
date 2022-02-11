const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const loginController = require('../controllers/loginController')


router.post('/', userController.create)
router.post('/login', loginController.login)
router.get('/', userController.getAll)

module.exports = router