/**
 * Error类封装
 */
// 封装Error基类
class HttpException extends Error {
    constructor(msg='服务器异常', errorCode=10000, code=400){
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParamException extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 200
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 404
        this.msg = msg || 'not Found'
        this.errorCode = errorCode || 404
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 403
        this.msg = msg || '无权限'
        this.errorCode = errorCode || 100003
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '已点赞'
        this.errorCode = errorCode || 100010
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '已取消点赞'
        this.errorCode = errorCode || 100011
    }
}

module.exports = {
    HttpException,
    ParamException,
    Success,
    NotFound,
    AuthFailed,
    Forbidden,
    LikeError,
    DislikeError
}