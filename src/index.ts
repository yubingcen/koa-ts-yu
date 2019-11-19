import Koa from 'koa'
import { Context } from "koa"
const app = new Koa()

app.use(async (ctx: Context) => {

  ctx.body = 'Hello World!'
});

app.listen(8081)
console.log("Server running on port 8081")