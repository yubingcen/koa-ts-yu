import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    require: true
  },
  account: {
    type: String
  },
  username: {
    type: String
  },
  nickname: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  headerImg: {
    type: String
  },
  created: {
    type: String
  },
  rolls: {
    type: Array,
    default: ['user']
  }
}, { collection: 'user', versionKey: false })

export default mongoose.model('user', UserSchema)
