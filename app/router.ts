//import Router from 'koa-router';
const orderRouter = require('./routers/orderRouter.ts')

class Router {
    init(app){
        app.use('/', orderRouter)
    }
}

module.exports = new Router()