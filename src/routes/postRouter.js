const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const { AUTH_ADMIN } = require('../middleware/checkRoleMiddleware')

router.post('/', AUTH_ADMIN, postController.create)
router.put('/:id', AUTH_ADMIN, postController.update)
router.delete('/:id', AUTH_ADMIN, postController.delete)
router.get('/', postController.getAll)
router.get('/:id', postController.getCategory)

module.exports = router