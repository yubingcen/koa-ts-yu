import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema
const FileSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String
  },
  path: {
    type: String
  },
  type: {
    type: String
  },
  md5: {
    type: String
  },
}, { collection: 'file', versionKey: false })

export default mongoose.model('file', FileSchema)
