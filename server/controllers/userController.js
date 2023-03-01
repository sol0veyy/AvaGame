const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Subscriber} = require('../models/models')

const generateJwt = (id, login, email, role) => {
    return jwt.sign(
        {id, login, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res) {
        const {login, email, password, role} = req.body
        if (!login) {
            return next(ApiError.badRequest('Некорректный login'))
        }
        if (!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        if (!password) {
            return next(ApiError.badRequest('Некорректный пароль'))
        }
        const candidateLogin = await User.findOne({where: {login}})
        const candidateEmail = await User.findOne({where: {email}})
        if (candidateLogin) {
            return next(ApiError.badRequest('Логин занят'))
        }
        if (candidateEmail) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, email, role, password: hashPassword})
        const subscriber = await Subscriber.create({userId: user.id})
        const token = generateJwt(user.id, user.login, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body 
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()