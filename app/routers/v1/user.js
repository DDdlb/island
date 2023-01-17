const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const {ParamException} = require('../../../core/http-exception')
const {User} = require('../../models/user')
const {Success} = require('../../../core/http-exception')
const router = new Router({
    prefix: '/v1/user'
})

const { RegisterValidator } = require('../../validators/user')
const { success } = require('../../lib/helper')

/**
 * @description 注册接口
 * @param {nickname, email, password1, password2}
 */
router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname')
    }
    const r = User.create(user)
    success('注册成功')
})

module.exports = router