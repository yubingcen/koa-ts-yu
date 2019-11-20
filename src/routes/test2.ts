import Router from 'koa-router'
import { alert1 } from '../controller/test1'

const router = new Router()
router.get('/test', alert1)

export default router