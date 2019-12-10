import Router from 'koa-router'
import publicController from './../controller/publicController'
const router = new Router()

router.get('/public/getCaptcha', publicController.getCaptcha)

export default router