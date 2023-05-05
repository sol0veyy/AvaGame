const {Avatar, AvatarModeration, AvatarTag, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const { request } = require('http')

class AvatarController {
    async create(req, res, next) {
        try {
            let {userId, categoryId, tags} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const avatar = await Avatar.create({userId, categoryId, img: fileName})
            const user = await User.findByPk(userId);
            await user.update({publications: user.publications + 1});
            // if (tags) {
            //     tags = JSON.parse(tags)
            //     tags.forEach(i => {
            //         AvatarTag.create({
            //             avatarId: avatar.id,
            //             name: i.name
            //         })
            //     })
            // }
            
            return res.json(avatar)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserAvatars(req, res) {
        const {userId} = req.params;
        const avatars = await Avatar.findAll({where: {userId}});
        return res.json(avatars);
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