import { resBody, resError, resInfo } from '../utils/response'

const alert = async (ctx: any, next: any) => {
  ctx.body = 'aaa'
  resError('/', '测试！')
  console.log('controller test1')
}

function alert1() {
  console.log('alert1 controller test1')
}
export { alert, alert1 }