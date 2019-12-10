import CombineRouters from 'koa-combine-routers' //路由压缩
import pbcontroller from './public'
import userController from './user'
import files from './files'

export default CombineRouters(
  pbcontroller,
  userController,
  files
)