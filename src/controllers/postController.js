const { verify } = require("../../lib/jwt");
const { v4: UUID } = require('uuid')
const path = require('path');
const { Post } = require('../models/models')
const ApiError = require('../error/ApiError');


class PostController {
    async create(req, res, next) {
        try {
            let { title, content, categoryId } = req.body
            const { token } = req.headers;
            const { adminId } = verify(token);

            const { img } = req.files

            const imgArr = img.mimetype.split("/")

            if (imgArr[0] !== "image") {
                return res.status(400).json({ message: "Only file type img!" })
            }

            const fileName = `__${imgArr[0]}__${UUID()}.${imgArr[1]}`;

            img.mv(path.join(__dirname, "../static", fileName));

            const post = await Post.create({ title, content, adminId, categoryId, img: fileName });

            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let { title, content, categoryId } = req.body
            let { id } = req.params
            const { img } = req.files

            if (imgArr[0] !== "image") {
                return res.status(400).json({ message: "Only file type img!" })
            }

            const fileName = `__${imgArr[0]}__${UUID()}.${imgArr[1]}`;

            img.mv(path.join(__dirname, "../static", fileName));

            await Post.update({ title, content, categoryId, img: fileName }, {
                where: {
                    id
                }
            });

            return res.json('Updated!')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            await Post.destroy({
                where: {
                    id
                }
            })

            return res.json('Delete Post!')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const post = await Post.findAll({
                order: [
                    ['id', 'DESC'],
                ]
            })
            console.log(post)
            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCategory(req, res) {
        try {
            const { id } = req.params

            const admins = await Post.findAll({
                where: {
                    categoryId: id
                }
            })
            return res.json(admins)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new PostController()