const Router = require('koa-router')
const Auth = require('../../../middleWares/auth')
const router = new Router({prefix: '/v1/like'})

router.post('/', new Auth().m, async (ctx) => {
    
})