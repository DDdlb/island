const fetch = require('node-fetch')
const util = require('util')
const axios = require('axios')
const config = require('../../config/config')
const { AuthFailed } = require('../../core/http-exception')
const { withCtx } = require('vue')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const Auth = require('../../middleWares/auth')

class WXManager {
    // 小程序
    static async codeToToken(code){
        //前端生成code传给后端，后端根据code请求微信服务器获取openid
        const url = util.format(config.wx.loginUrl, 
            config.wx.appId, 
            config.wx.appSecret, 
            code
        )

        const res = await axios.get(url)
        if(res.status !== 200){
            throw new AuthFailed('openId 获取失败')
        }
        if(res.errcode && res.errcode !== 0){
            throw new AuthFailed('openId 获取失败' + res.data.errcode)
        }
        // 档案管理，将openid传入数据库
        let user = await User.getUserByOpenid(res.data.openid)
        if(!user){
            user = await User.registerByOpenid(res.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}