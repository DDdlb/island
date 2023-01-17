const { Forbidden } = require("../core/http-exception")
const jwt = require('jsonwebtoken')
const config = require("../config/config")

/**
 *  @param {*} level  接口权限级别
 */
class Auth {
    constructor(level){
        // 权限设置
        Auth.USER = 8   // 普通用户
        Auth.ADMIN = 16 // 管理员
        Auth.SUPER_ADMIN = 32   // 超级管理员
        this.level = level || 1
    }

    get m(){
        return async (ctx, next) => {
            // header.Authorization = 'Bearer token'
            const token = ctx.request.header.authorization.slice(7)

            let errMsg = 'token不合法'
            // 无token
            if(!token){
                throw new Forbidden(errMsg)
            }

            try{
                var decode = jwt.verify(token, config.security.secretKey)
            }catch(error){
                if(error.name === 'TokenExpiredError'){
                    errMsg = 'token过期'
                }
                throw new Forbidden(errMsg)
            }
            console.log(decode.scope, this.level);
            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new Forbidden(errMsg)
            }

            //未抛出异常，token检验通过，返回token数据
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }
}

module.exports = Auth