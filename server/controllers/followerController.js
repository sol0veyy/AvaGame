const { where } = require("sequelize")
const ApiError = require("../error/ApiError")
const { UserFollower, User } = require("../models/models")

class FollowerController {
    async follow(req, res, next) {
        const { followerId, userId } = req.body

        try {
            const follower = await UserFollower.create({followerId, userId})

            return res.json({follower})
        } catch {
            return next(ApiError.badRequest('Ошибка при подписке'))
        }

    }

    async unfollow(req, res, next) {
        const { followerId, userId } = req.params

        try {
            const follower = await UserFollower.findOne({where: {followerId, userId}})
            await follower.destroy()
    
            return res.json({follower})
        } catch {
            return next(ApiError.badRequest('Ошибка при отписке'))
        }
    }

    async getIsUserFollow(req, res) {
        const { followerId, userId } = req.params

        const isFollow = await UserFollower.findOne({where: {followerId, userId}})

        return res.json({isFollow: Boolean(isFollow)})
    }

    async getAllUserSubs(req, res, next) {
        const {followerId} = req.params

        try {
            const userSubs = await UserFollower.findAll({where: {followerId}});

            const usersId = userSubs.map((userSub) => userSub.userId);

            const users = await User.findAll({
                where: {id: usersId}
            });

            return res.json({users})
        } catch {
            next(ApiError.badRequest('Ошибка при получении подписок'))
        }
    }
}

module.exports = new FollowerController()