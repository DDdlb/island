const Router = require('koa-router')
const Auth = require('../../../middleWares/auth')
const { Art } = require('../../models/art')
const { Movie, Music, Sentence } = require('../../models/classic')
const {Flow} = require('../../models/flow')

const router = new Router({
    prefix: '/v1/classic'
})
/**
 * 获取最新期刊接口
 */
router.get('/latest', new Auth(8).m, async (ctx)=>{
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']   // index字段倒序排列
        ]
    })
    // 查询实例数据
    const art = await Art.getData(flow.art_id, flow.type)
    // console.log(flow);
    // 直接将属性挂载至 class类上无效，sequelize 封装 model 类只返回dataValues上的值
    // art.index = flow.index
    art.dataValues.index = flow.index
    ctx.body = art
})

module.exports = router