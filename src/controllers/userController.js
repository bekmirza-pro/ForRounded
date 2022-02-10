const ApiError = require('../error/ApiError');
const { User } = require('../models/models')


class UserController {
    async create(req, res, next) {
        try {
            const { firstname, lastname, tell, categoryId } = req.body

            const user = await User.create({ firstname, lastname, tell, categoryId })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const users = await User.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
        return res.json(users)
    }
}

module.exports = new UserController()