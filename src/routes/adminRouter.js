const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const { AUTH_SUPER_ADMIN } = require('../middleware/checkRoleMiddleware')

router.post('/', AUTH_SUPER_ADMIN, adminController.create)
router.delete('/:id', AUTH_SUPER_ADMIN, adminController.delete)
router.get('/', AUTH_SUPER_ADMIN, adminController.getAll)

module.exports = router