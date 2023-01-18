/**
 * class 包括 music，sentence， movie
 */
const { Sequelize, Model } = require("sequelize");
const sequelize = require('../../core/db')

// 共有字段 
const classicFields = {
    image: Sequelize.STRING,  // 图片链接
    content: Sequelize.STRING,  // 内容
    pubdate: Sequelize.DATEONLY,  // 发布时间 
    fav_nums: Sequelize.INTEGER,    // 点赞数量
    title: Sequelize.STRING,    // 标题
    type: Sequelize.TINYINT,    // 类型
}

class Movie extends Model {}

Movie.init(classicFields,{
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {}

Music.init({
    ...classicFields, 
    url: Sequelize.STRING,  // 音频链接
},{
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}