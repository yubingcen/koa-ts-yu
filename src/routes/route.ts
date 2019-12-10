import CombineRouters from 'koa-combine-routers' //路由压缩
import router1 from './test1'
import router2 from './test2'
import files from './files'
import login from './login'
import pbcontroller from './public'

export default CombineRouters(router1, router2, files, login, pbcontroller)