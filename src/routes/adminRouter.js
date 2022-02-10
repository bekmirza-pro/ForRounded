const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('SUPER_ADMIN'), adminController.create)
router.delete('/:id', checkRole('SUPER_ADMIN'), adminController.delete)
router.get('/', adminController.getAll)

module.exports = router