import Koa from 'koa'
import route from "./routes/route";
import helmet from 'koa-helmet' //安全头部
import koaBody from 'koa-body'
import koaCors from "koa-cors" // 解决跨域
import jwt from 'koa-jwt'
// import compose from 'koa-compose'
import CONFIG from './config/configs'
import ErrorHandle from './common/errorHandle'
const app = new Koa()

const JWT = jwt({secret: CONFIG.SECRET}).unless({ path: [/^\/public\/\S*/, /\/login/, /\/register/]})

/** TODO 目前有点问题无法正常使用
 * 使用koa-compose 集成中间件
 */
// const middleware = compose([
//   koaBody({
//     multipart: true,
//     formidable: {
//       hash: 'md5',
//       maxFileSize: 20 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
//     }
//   }),
//   koaCors(),
//   helmet(),
//   ErrorHandle,
//   JWT
// ])
app.use(koaBody({
    multipart: true,
    formidable: {
      hash: 'md5',
      maxFileSize: 20 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
    }
  }))
app.use(koaCors())
app.use(helmet())
app.use(ErrorHandle)
app.use(JWT)
// app.use(middleware)
app.use(route())

app.listen(CONFIG.PORT)
console.log(`Server running on port ${CONFIG.PORT}`)