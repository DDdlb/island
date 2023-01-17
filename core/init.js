// 自动化路由加载
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    // 入口总方法
    static initCore(app){
        // ClassName.function 的方式调用类中的静态方法
        InitManager.app = app
        // 初始化路由
        InitManager.initLoadRouters()
        // 初始化全局异常
        // InitManager.loadHttpException()
    }
    static initLoadRouters(){
        const whenLoadModule = (obj) => {
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
        // 自动化路由加载配置, requireDirectory 第一个参数固定 module， 第二个为目录url， 第三个为配置项
        // 使用绝对路径，防止url变化, process.cwd()获取项目根目录的绝对路径
        const routerDirectory = `${process.cwd()}/app/routers`
        requireDirectory(module, routerDirectory, {
            visit: whenLoadModule
        })
    }
    // 封装异常类挂载至global全局对象中
    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager