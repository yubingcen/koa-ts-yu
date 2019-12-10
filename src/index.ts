import Koa from 'koa'
import route from "./routes/route";
import helmet from 'koa-helmet' //安全头部
import koaBody from 'koa-body'
import koaCors from "koa-cors" // 解决跨域
import jwt from 'koa-jwt'
import CONFIG from './config/configs'
import ErrorHandle from './common/errorHandle'
import mongoose from 'mongoose'
const app = new Koa()

app.use(koaBody({
  multipart: true,
  formidable: {
    hash: 'md5',
    maxFileSize: 20 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
  }
}))
app.use(ErrorHandle)
app.use(jwt({secret: CONFIG.SECRET}).unless({ path: [/^\/public\/\S*/, /\/login/, /\/register/]}))
app.use(helmet())
app.use(koaCors())
app.use(route())

mongoose.connect(CONFIG.MongoDB, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})

app.listen(CONFIG.PORT)
console.log(`Server running on port ${CONFIG.PORT}`)