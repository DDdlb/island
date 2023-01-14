/**
 * 全局异常处理
 * 1. 监听异常
 * 2. 捕获异常并响应，输出有意义的信息
 */

const { HttpException } = require("../core/http-exception")

const catchError = async (ctx, next) => {
    try{
        await next()
    }catch(error){
        // error处理，返回给前端有用信息
        // 返回信息包含 msg， status， errorCode， request_url

        // 已知错误
        if(error instanceof HttpException){
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        else{
            // 未知异常
            ctx.body = {
                msg: 'An unknown mistake propose',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError