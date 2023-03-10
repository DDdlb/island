const jwt = require('jsonwebtoken')
const config = require('../config/config')
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}
/**
 * @description 颁布令牌方法
 * @param {*} uid 用户id
 * @param {*} scope 用户权限
 */
const generateToken = (uid, scope) => {
    const token = jwt.sign({
        uid,
        scope
    }, config.security.secretKey, {expiresIn: config.security.expiresIn})
    return token
}

module.exports = {
    findMembers,
    generateToken
}