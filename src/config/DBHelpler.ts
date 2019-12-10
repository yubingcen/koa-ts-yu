import mongoose from 'mongoose'
import CONFIG from './configs'

// 创建连接
mongoose.connect(CONFIG.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + CONFIG.MongoDB);
})

// 连接异常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
})

// 断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose