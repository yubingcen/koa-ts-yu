import Router from 'koa-router'
import { getFile, postFile } from './../controller/fileController'
const router = new Router()

router.post('/file/upload', postFile)
router.get('/file/:uuid', getFile)

export default router