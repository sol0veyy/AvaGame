const Router = require('express')
const router = new Router()
const avatarController = require('../controllers/avatarController')


router.post('/', avatarController.create);
router.get('/:userId', avatarController.getUserAvatars);
router.get('/', avatarController.getAll);

module.exports = router;