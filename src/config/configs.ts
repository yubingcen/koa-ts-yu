const Port = process.env.PORT || 10010
const Mongodb = 'mongodb://localhost:27017/pigger'
const SaltTimes = 3 // 加盐的次数（用户密码加密）
const Secret = 'bingo'
const Session = {
  key: 'bingo',
  maxAge: 86400000
}
export {
  Port,
  Mongodb,
  SaltTimes,
  Secret,
  Session
}
