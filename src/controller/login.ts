import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { Secret } from '../config/configs'
import checkCode from '../utils/checkCode'

const login = async (ctx: Context) => {
  const { body } = ctx.request
  let sid: string = body.sid
  let code: string = body.code
  if(await checkCode(sid, code)) {
    // 验证账号密码
    let token = jwt.sign({username: 'ybc'}, Secret, {
      expiresIn: '1d'
    })
    ctx.body = {
      code: 200,
      data: token
    }
  } else {
    ctx.body = {
      code: 401,
      msg: '图片验证码不正确'
    }
  }
}

export { login }