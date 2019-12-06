import { Context, Next } from 'koa'

const handle = (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      throw err
    }
  })
}

export default handle