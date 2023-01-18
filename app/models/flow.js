/**
 * 用于描述movie，sentence，music的关系
 */

const { Model, Sequelize } = require("sequelize");
const sequelize = require('../../core/db')

class Flow extends Model {}

Flow.init({
    index: Sequelize.INTEGER,   // 期刊期号 
    art_id: Sequelize.INTEGER,  // 期刊实体id
    type: Sequelize.INTEGER,    // 期刊类型
},{
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}