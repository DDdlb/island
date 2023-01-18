/**
 * 点赞模型
 */

const { Model, Sequelize } = require("sequelize");
const { LikeError } = require("../../core/http-exception");
const sequelize = require('../../core/db');
const { Art } = require("./art");

// 业务表
class Favor extends Model {
    static async like(art_id, type, uid){
        // 查询是否已经点赞
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        // 已点赞
        if(favor){
            throw new LikeError()
        }
        // 1. Favor表中添加数据
        // 2. 修改实体表中的fav_nums值
        // 使用数据库事务，保证数据一致性
        sequelize.transaction(t=>{
            await Favor.create({
                art_id,
                type,
                uid
            },{transaction: t})

            const art = await Art.getData(art_id, type)
            await art.increment('fav_nums', {by: 1, transaction: t})
        })

    }

    static async dislike(art_id, type, uid){
        
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
})

module.exports = {
    Favor
}