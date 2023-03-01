const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    publications: {type: DataTypes.INTEGER, defaultValue: 0},
    subscribers: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, defaultValue: ''}, // TODO
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Subscriber = sequelize.define('subscriber', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Followers = sequelize.define('followers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // user_id, subscriber_id (user)
})

const UserComment = sequelize.define('user_comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    // user_id, avatar_id
})

const Avatar = sequelize.define('avatar', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING}
    // user_id, category_id
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const AvatarTag = sequelize.define('avatar_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
    // avatar_id
})

const AvatarModeration = sequelize.define('avatar_moderation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
    // avatar_id
})

const AvatarPublished = sequelize.define('avatar_published', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    rate: {type: DataTypes.INTEGER, defaultValue: 0}
    // avatar_id
})

User.hasOne(Subscriber)
Subscriber.belongsTo(User)

User.hasOne(Followers)
Followers.belongsTo(User)

Subscriber.hasMany(Followers)
Followers.belongsTo(Subscriber)

User.hasMany(UserComment)
UserComment.belongsTo(User)

Avatar.hasMany(UserComment)
UserComment.belongsTo(Avatar)

User.hasMany(Avatar)
Avatar.belongsTo(User)

Category.hasOne(Avatar)
Avatar.belongsTo(Category)

Avatar.hasMany(AvatarTag, {as: 'tags'})
AvatarTag.belongsTo(Avatar)

Avatar.hasOne(AvatarModeration)
AvatarModeration.belongsTo(Avatar)

Avatar.hasOne(AvatarPublished)
AvatarPublished.belongsTo(Avatar)

module.exports = {
    User,
    Subscriber,
    Followers,
    UserComment,
    Avatar,
    Category,
    AvatarTag,
    AvatarModeration,
    AvatarPublished
}
