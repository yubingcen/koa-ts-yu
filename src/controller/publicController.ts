import SVG from 'svg-captcha'
import { Context } from 'koa'
import { getValue, setValue } from '../config/redisConfig'

class PublicController {
  constructor() {}
  async getCaptcha (ctx: Context) {
    const body = ctx.request.query
    console.log(body.sid)
    const captcha  = SVG.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 70,
      height: 19,
    })
    // 设置验证码5分钟过期
    setValue(body.sid, captcha.text, 60 * 5)
    ctx.body = {
      code: 200,
      data: captcha.data,
    }
  }
}

export default new PublicController()