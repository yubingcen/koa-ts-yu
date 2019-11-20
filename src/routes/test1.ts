import Router from 'koa-router'
import { alert } from '../controller/test1'

const router = new Router()
router.get('/', alert)

export default router