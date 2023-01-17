const bcrypt = require('bcryptjs')
const sequelize = require('../../core/db')

const {Sequelize, Model} = require('sequelize')
const { NotFound, AuthFailed } = require('../../core/http-exception')

class User extends Model {
    static async verifyEmailPassword(email, password){
        const user = await User.findOne({
            where: {
                email,
            }
        })

        if(!user){
            throw new NotFound('用户不存在')
        }
        // 检验密码
        const correct = bcrypt.compareSync(password, user.password)
        if(!correct){
            throw new AuthFailed('用户名或密码错误')
        }
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        // 原始密码加密
        set(val){
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
            console.log(`set password org: ${val}, new: ${psw}`);
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
},{
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}