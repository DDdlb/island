const Router = require('koa-router')
const Auth = require('../../../middleWares/auth')

const router = new Router({
    prefix: '/v1/classic'
})

router.get('/latest', new Auth(8).m, async (ctx)=>{
    ctx.body = ctx.auth
})

module.exports = router