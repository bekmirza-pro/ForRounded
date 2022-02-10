const uuid = require('uuid')
const path = require('path');
const { Post } = require('../models/models')
const ApiError = require('../error/ApiError');


class PostController {
    async create(req, res, next) {
        try {
            let { title, content, adminId, categoryId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
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

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
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
        const post = await Post.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
        console.log(post)
        return res.json(post)
    }

}

module.exports = new PostController()