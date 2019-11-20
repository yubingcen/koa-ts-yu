import Koa from 'koa'
import router from "./routes/route";
import helmet from 'koa-helmet' //安全头部
import { Context } from "koa"
import { Port, Mongodb } from './config/configs'
import mongoose from 'mongoose'
const app = new Koa()

app.use(helmet())
app.use(router())
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