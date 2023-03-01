const Router = require('express')
const router = new Router()
const avatarController = require('../controllers/avatarController')


router.post('/', avatarController.create)
router.get('/', avatarController.getAll)

module.exports = router