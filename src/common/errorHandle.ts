import { Context, Next } from 'koa'
import { resError } from '../utils/response'

const handle = (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message,
      }, { stack: err.stack })
      resError(err.stack, err.message)
      throw err
    }
  })
}

export default handle