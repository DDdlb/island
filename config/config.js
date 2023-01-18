module.exports = {
    database: {
        dbName: 'island',
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'zxcvbnm990617'
    },
    security: {
        secretKey: "asydts5d23847gj%^6s5dabn.ncvhd",
        expiresIn: 60*60 //令牌过期时间
    },
    wx: {
        appId: 'wx6620cfc1966d55e0',
        appSecret: '7e2f6a55ec86131590725b60ea1e332c',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}