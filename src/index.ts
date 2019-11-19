import Koa from 'koa'
const app = new Koa()

app.use(async (ctx: any) => {

  ctx.body = 'Hello World!'
});

app.listen(8081)
console.log("Server running on port 8081")