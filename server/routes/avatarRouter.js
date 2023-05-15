const Router = require('express')
const router = new Router()
const avatarController = require('../controllers/avatarController')


router.post('/', avatarController.create);
router.post('/del', avatarController.delAvatar)
router.post('/like', avatarController.setLikes);
router.post('/like/del', avatarController.delLike);
router.get('/like/:avatarId/:userId', avatarController.getLike)
router.get('/:userId', avatarController.getUserAvatars);
router.get('/tag/:tag', avatarController.getByTag);
router.get('/filter/:time/:tags/:author/:category', avatarController.getByFilter);
router.get('/', avatarController.getAll);

module.exports = router;