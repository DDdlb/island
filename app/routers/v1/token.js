const Router = require('koa-router')
const { ParamException } = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')
const Auth = require('../../../middleWares/auth')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { TokenValidator } = require('../../validators/user')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    // 处理登录方式  type
    let token;
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            // 这里必须加 await 否则无法捕获异常， async函数前必须加await
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        default:
            throw new ParamException('无type处理函数')
    }
    ctx.body = {
        token
    }

})

const emailLogin = async (email, secret) => {
    const user = await User.verifyEmailPassword(email, secret)

    return generateToken(user.id, Auth.USER)
}
module.exports = router