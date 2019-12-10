import CombineRouters from 'koa-combine-routers' //路由压缩
import router1 from './test1'
import router2 from './test2'
import files from './files'
import pbcontroller from './public'
import userController from './user'

export default CombineRouters(router1, router2, files, pbcontroller, userController)