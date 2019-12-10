import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema
const PasswordSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
}, { collection: 'password', versionKey: false})

export default mongoose.model('password', PasswordSchema)
