import Router from 'koa-router'
import userController from './../controller/userController'
const router = new Router()

router.post('/login', userController.login)
router.post('/register', userController.register)

export default router