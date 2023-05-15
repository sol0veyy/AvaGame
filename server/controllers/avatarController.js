const {Avatar, AvatarModeration, AvatarTag, User, AvatarLikes} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const { Op, where } = require('sequelize')
const { Sequelize } = require('../db')
class AvatarController {
    async create(req, res, next) {
        try {
            let {userId, categoryId, tags} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const avatar = await Avatar.create({userId, categoryId, img: fileName})
            const allAvatar = await Avatar.findAll({
                where: {userId},
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: AvatarTag, as: 'tags'
                    },
                    {
                        model: AvatarLikes, as: 'likes'
                    }
                ]
            })
            const user = await User.findByPk(userId);
            await user.update({publications: user.publications + 1});

            if (tags) {
                tags = JSON.parse(tags)
                tags.forEach(i => {
                    AvatarTag.create({
                        avatarId: avatar.id,
                        name: i
                    })
                })
            }
            
            return res.json(allAvatar)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delAvatar(req, res) {
        const {avatarId, userId} = req.body;
        await Avatar.destroy({where: {
            id: avatarId,
            userId: userId
        }});
        const user = await User.findByPk(userId);
        await user.update({publications: user.publications - 1});
        const avatar = await Avatar.findAll({
            where: {userId},
            order: [
                ['id', 'DESC']
            ],
            include: [
                {
                    model: AvatarTag, as: 'tags'
                },
                {
                    model: AvatarLikes, as: 'likes'
                }
            ]
        })
        return res.json(avatar);
    }

    async setLikes(req, res) {
        const {avatarId, userId} = req.body
        const avatarLikes = await AvatarLikes.create({avatarId, userId});
        return res.json(avatarLikes);
    }

    async delLike(req, res) {
        const {avatarId, userId} = req.body;
        const avatarLike = await AvatarLikes.destroy({where: {avatarId, userId}});
        return res.json(avatarLike);
    }

    async getLike(req, res) {
        const {avatarId, userId} = req.params;
        const avatarLike = await AvatarLikes.findAll({where: {avatarId, userId}})
        return res.json(avatarLike);
    }

    async getUserAvatars(req, res) {
        const {userId} = req.params;
        const avatars = await Avatar.findAll({
            where: {userId},
            order: [
                ['id', 'DESC']
            ],
            include: [
                {
                    model: AvatarTag, as: 'tags'
                },
                {
                    model: AvatarLikes, as: 'likes'
                }
            ]
        });
        return res.json(avatars);
    }

    async getAll(req, res) {
        const avatars = await Avatar.findAll(
            {
                order: [
                    ['id', 'DESC']
                ],
                include: [
                    {
                        model: AvatarTag, as: 'tags'
                    },
                    {
                        model: AvatarLikes, as: 'likes'
                    }
                ]
            }
        )
        return res.json(avatars)
    }

    async getByFilter(req, res) {
        const {time, tags, author, category} = req.params;
        const where = {};
        const include = [
            {
                model: AvatarTag,
                as: 'tags',
            }, 
            {
                model: AvatarLikes, as: 'likes'
            }];

        if (time !== "all") {
            where.createdAt = {[Op.gte]: Sequelize.fn('date_trunc', `${time}`, Sequelize.fn('now'))};
        }

        if (tags !== "all") {
            include.push({
                model: AvatarTag,
                as: 'tags',
                where: {name: tags}
            });
        }

        if (author !== "all") {
            include.push({
                model: User,
                as: 'user',
                where: {login: author}
            })
        }

        if (category !== "all") {
            where.categoryId = category;
        }

        const avatars = await Avatar.findAll({where, include,
            order: [
                ['id', 'DESC']
            ]
        });
        return res.json(avatars);
    }

    async getByTag(req, res) {
        const {tag} = req.params;
        const avatars = await Avatar.findAll(
            {
                order: [
                    ['id', 'DESC']
                ],
                include: [{
                    model: AvatarTag,
                    as: 'tags',
                    where: {name: tag}
                }, 
                {
                    model: AvatarLikes, as: 'likes'
                }]
            }
        );
        return res.json(avatars);
    }
}

module.exports = new AvatarController()