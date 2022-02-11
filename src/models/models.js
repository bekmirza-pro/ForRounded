const sequelize = require('../../lib/db')
const { DataTypes } = require('sequelize')

const Admin = sequelize.define('admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: false },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, }
})

const Post = sequelize.define('posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, },
    content: { type: DataTypes.STRING, unique: true, },
    img: { type: DataTypes.STRING, allowNull: false }
})

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING, unique: true, },
    lastname: { type: DataTypes.STRING, unique: true, },
    tell: { type: DataTypes.INTEGER },
    password: { type: DataTypes.STRING, allowNull: false }
})

Admin.hasMany(Category, { onDelete: 'CASCADE' })
Category.belongsTo(Admin)

Admin.hasMany(Post, { onDelete: 'CASCADE' })
Post.belongsTo(Admin)

Category.hasMany(Post, { onDelete: 'CASCADE' })
Post.belongsTo(Category)

Category.hasOne(User)
User.belongsTo(Category)

module.exports = {
    Admin,
    Category,
    Post,
    User
}