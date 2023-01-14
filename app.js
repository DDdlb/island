const Koa = require('koa')
const Router = require('koa-router')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middleWares/exception')
// 应用程序对象
const app = new Koa()

app.use(catchError)
app.use(parser())
// 初始化应用程序
InitManager.initCore(app)

app.listen(3000)
/**
 * 导入方式：
 * 1. commonJS require
 * 2. ES6 import from 
 * 3. AMD
 */

/**
 * 中间件函数要加async， next前加await，否则不能按照洋葱模型的顺序执行
 */

/**
 * 中间件：
 * next返回结果为一个Promise
 */

/**
 * 版本号处理：
 * 1. 路径    /v1/xxx/xxx
 * 2. 查询参数    /xxx/xxx?version=v1
 * 3. header
 */