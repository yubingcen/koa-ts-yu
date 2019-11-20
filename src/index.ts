import Koa from 'koa'
import { Context } from "koa"
import { Port } from './config/configs'
const app = new Koa()

app.use(async (ctx: Context) => {

  ctx.body = 'Hello World!'
});

app.listen(Port)
console.log("Server running on port 8081")