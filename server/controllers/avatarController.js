const {Avatar, AvatarModeration, AvatarTag} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')

class AvatarController {
    async create(req, res, next) {
        try {
            let {userId, categoryId, tags} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const avatar = await Avatar.create({userId, categoryId, tags, img: fileName})

            if (tags) {
                tags = JSON.parse(tags)
                tags.forEach(i => {
                    AvatarTag.create({
                        avatarId: avatar.id,
                        name: i.name
                    })
                })
            }

            return res.json(avatar)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const avatars = await Avatar.findAll(
            {
                include: [{model: AvatarTag, as: 'tags'}]
            }
        )
        return res.json(avatars)
    }
}

module.exports = new AvatarController()