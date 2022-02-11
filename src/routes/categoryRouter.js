const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const { AUTH_ADMIN } = require('../middleware/checkRoleMiddleware')

router.post('/', AUTH_ADMIN, categoryController.create)
router.put('/:id', AUTH_ADMIN, categoryController.update)
router.delete('/:id', AUTH_ADMIN, categoryController.delete)
router.get('/', categoryController.getAll)

module.exports = router