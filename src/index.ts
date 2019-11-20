import Koa from 'koa'
import route from "./routes/route";
import helmet from 'koa-helmet' //安全头部
import koaBody from 'koa-body'
import koaCors from "koa-cors" // 解决跨域
import { Context } from "koa"
import { Port, Mongodb } from './config/configs'
import mongoose from 'mongoose'
const app = new Koa()

app.use(koaBody({
  multipart: true,
  formidable: {
    hash: 'md5',
    maxFileSize: 20 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
  }
}))

app.use(helmet())
app.use(koaCors())
app.use(route())
app.use(async (ctx: Context) => {

  ctx.body = 'Hello World!'
});


mongoose.connect(Mongodb, { useNewUrlParser: true,  useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})

app.listen(Port)
console.log(`Server running on port ${Port}`)