const { Admin } = require('../models/models')
const ApiError = require('../error/ApiError');
const { hashPassword } = require("../../lib/bcrypt");
class adminController {
    async create(req, res, next) {
        try {
            const { username, password } = req.body;

            if (!password || !username)
                return res.status(400).json({ message: "BAD_REQUEST!" });

            const hashedPassword = await hashPassword(password);

            const admin = await Admin.create({
                username,
                password: hashedPassword
            });

            return res.json(admin);
        } catch (e) {
            next(ApiError.badRequest(e.message));
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
        try {
            const admins = await Admin.findAll({
                order: [
                    ['id', 'DESC'],
                ]
            })
            return res.json(admins)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params

            const admins = await Admin.findOne({
                where: {
                    id
                }
            })
            return res.json(admins)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new adminController()