import Router from 'koa-router'
import { login } from './../controller/login'
const router = new Router()

router.post('/login', login)

export default router