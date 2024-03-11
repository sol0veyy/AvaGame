const Router = require('express')
const router = new Router()
const followerController = require('../controllers/followerController')

router.post('/follow', followerController.follow)
router.delete('/unfollow', followerController.unfollow)
router.get('/isUserFollow', followerController.getIsUserFollow)

module.exports = router