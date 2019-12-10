import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import Dayjs from 'dayjs'
import uuid from 'uuid/v4'
import CONFIG from '../config/configs'
import { encrypt, validate } from '../utils/password'
import checkCode from '../utils/checkCode'
import User from '../models/user'
import Password from '../models/password'

class UserController {
  constructor () {}
  // 注册
  async register (ctx: Context) {
    const { body } = ctx.request
    let sid: string = body.sid
    let code: string = body.code
    if (!(body.nickname && body.username && body.sid && body.code && body.password)) {
      ctx.body = {
        code: 500,
        msg: '请输入完整信息。'
      }
      return
    }
    let msg: string = ''
    // 验证图片验证码的时效性、正确性
    let result = await checkCode(sid, code)
    console.log('code', result)
    let check = true
    if (result) {
      // 查库，看username是否被注册
      let findUsername: any = await User.findOne({ username: body.username })
      if (findUsername !== null && typeof findUsername.username !== 'undefined') {
        msg = '此用户已经注册，可以通过邮箱找回密码'
        check = false
      }
      let findNickname: any = await User.findOne({ nickname: body.nickname })
      // 查库，看nickname是否被注册
      if (findNickname !== null && typeof findNickname.nickname !== 'undefined') {
        msg = '此昵称已经被注册，请修改'
        check = false
      }
      // 写入数据到数据库
      if (check) {
        const userId = uuid()
        const newUser: any = await User.create({
          userId,
          username: body.username,
          nickname: body.nickname,
          created: Dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
        if (newUser) {
          // 加密
          const hash = await encrypt(body.password, CONFIG.SaltTimes)
          const result = await Password.create({ userId: userId, hash })

          if (result) {
            ctx.body = {
              code: 200,
              msg: '注册成功！',
              data: {
                userId: newUser.userId,
                nickname: newUser.nickname,
                username: newUser.username
              }
            }
            return
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '注册失败！'
          }
        }
      }
    } else {
      msg = '验证码错误，请重新获取！'
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
  // 登陆
  async login (ctx: Context) {
    const { body } = ctx.request
    let sid: string = body.sid
    let code: string = body.code
    if(await checkCode(sid, code)) {
      // 验证账号密码
      // 判断类型，防止注入
      if (typeof (body.username) !== 'string' || typeof (body.password) !== 'string') {
        ctx.status = 500
        ctx.body = {
          code: 500,
          msg: '类型错误!'
        }
        return
      }

      // 获取用户的 userId
      const user: any = await User.findOne({ username: body.username })
      if (!user) {
        ctx.body = {
          code: 500,
          msg: '用户不存在!'
        }
        return
      }

      const userId = user.userId

      // 获取数据库中的 hash
      const pass: any = await Password.findOne({ userId }, { hash: 1 })

      const match = await validate(body.password, pass.hash)
      if (match) {
        let token = jwt.sign({username: body.username}, CONFIG.SECRET, { expiresIn: '1d' })
        ctx.body = {
          code: 200,
          msg: '登录成功',
          data: Object.assign({
            username: user.username,
            nickname: user.nickname,
            userId: user.userId,
            cover: user.cover || ''
          }, {token: token})
        }
        return
      }

      ctx.body = {
        code: 500,
        msg: '账号或密码有误!'
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确'
      }
    }
  }
}

export default new UserController()