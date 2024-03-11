const { UserFollower, User } = require("../models/models")

class FollowerController {
    async follow(req, res) {
        const { followerId, userId } = req.body

        const follower = await UserFollower.create({followerId, userId})

        return res.json({follower})
    }

    async unfollow(req, res) {
        const { followerId } = req.body

        const follower = await UserFollower.findByPk(followerId)
        await follower.destroy()

        return res.json({follower})
    }

    async getIsUserFollow(req, res) {
        const { followerId, userId } = req.body

        const isFollow = await Boolean(UserFollower.findOne({where: {followerId, userId}}))

        return res.json({isFollow})
    }
}

module.exports = new FollowerController()