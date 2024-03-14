const Router = require('express')
const router = new Router()
const followerController = require('../controllers/followerController')

router.post('/follow', followerController.follow)
router.delete('/unfollow/:followerId/:userId', followerController.unfollow)
router.get('/isUserFollow/:followerId/:userId', followerController.getIsUserFollow)
router.get('/userSubs/:followerId', followerController.getAllUserSubs)

module.exports = router