const Router = require('koa-router')
// const {ParamException} = require('../../../core/http-exception')
const router = new Router()

/**
 * 获取参数方法：
 * 1. 路径中参数：  /book/:id    ctx.params
 * 2. 查询参数   /book?param=123    ctx.request.query
 * 3. headers中参数   ctx.request.header
 * 4. body中参数   ctx.request.body (需要安装 koa-body parser)
 */

router.get('/book', (ctx, next)=>{
    throw new global.errs.ParamException()
    ctx.body = 'book'
})

module.exports = router