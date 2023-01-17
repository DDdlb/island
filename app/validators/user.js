const {LinValidator, Rule} = require('../../core/lin-validator-v2')
const { LoginType } = require('../lib/enum')
const { User } = require('../models/user')

class RegisterValidator extends LinValidator {
    constructor(){
        super()
        this.email = [
            new Rule('isEmail', '不符合email格式')
        ]
        this.password1 = [
            // 长度范围
            new Rule('isLength', '密码最多32位字符，最少6个字符', {
                min: 6,
                max: 32
            }),
            // 密码强度校验
            new Rule('matches', '密码强度过低，密码必须包含数字字母和特殊字符', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]') 
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称最多32位字符，最少4个字符', {
                min: 4,
                max: 32
            }),
        ]
    }
    // LinValidator 规定自定义验证必须以validate开头
    validatePassword(vals){
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2){
            throw new Error('两次密码必须相同')
        }
    }
    // 验证 数据库中是否已存在 Email
   async  validateEmail(vals){
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })

        if(user){
            throw Error('email已存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor(){
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '不符合账号规则', {
                min: 6,
                max: 32
            })
        ]
    }

    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('缺少type参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}

module.exports = {
    RegisterValidator,
    TokenValidator
}