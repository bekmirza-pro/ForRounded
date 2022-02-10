const { Admin, Category } = require('../models/models')
const ApiError = require('../error/ApiError');

class adminController {
    async create(req, res, next) {
        try {
            const { username, role } = req.body
            const admin = await Admin.create({ username, role })

            return res.json(admin)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Admin.destroy({
                where: {
                    id
                }
            })

            return res.json('Delete Admin')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const admins = await Admin.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
        return res.json(admins)
    }

    async getOne(req, res) {
        const { id } = req.params

        const admins = await Admin.findOne({
            where: {
                id
            }
        })
        return res.json(admins)
    }

}

module.exports = new adminController()