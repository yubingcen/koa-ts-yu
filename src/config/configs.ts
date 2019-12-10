const Port = process.env.PORT || 10010
const Mongodb = 'mongodb://localhost:27017/pigger2'
const Redis = {
  host: '192.168.0.105',
  port: 15001,
  password: '123456',
}
const SaltTimes = 3 // 加盐的次数（用户密码加密）
const Secret = 'bingo'
const Session = {
  key: 'bingo',
  maxAge: 86400000
}
export {
  Port,
  Mongodb,
  Redis,
  SaltTimes,
  Secret,
  Session
}
