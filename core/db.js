const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    password,
    user
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    // 数据库类型
    dialect: 'mysql',
    // 端口号,
    host,
    port,
    // 是否打印日志, 默认true
    // logging: true,
    // 时区, 默认为世界时间，与北京时间相差8小时
    timezone: '+08:00'
})

// 同步模型，创建数据表
sequelize.sync({
    force: false
})

module.exports = sequelize