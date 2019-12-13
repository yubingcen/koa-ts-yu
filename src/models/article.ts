import mongoose from '../config/DBHelpler'
import Dayjs from 'dayjs'

const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    require: true
  },
  moduleId: {
    type: String
  },
  cover: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  user: {
    type: String
  },
  type: {
    type: String
  },
  tag: {
    type: String
  },
  abstract: {
    type: String
  },
  files: {
    type: Array
  },
  status: {
    type: Number,
  },
  look: {
    type: Number,
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
}, { collection: 'article', versionKey: false })

ArticleSchema.statics = {
  getList: function (opstions: object, sort: string = 'createdAt', page: number = 0, limit: number = 15) {
    return this.find(opstions)
      .sort({ [sort]: -1 })
      .skip(page * limit).limit(limit)
  }
}



module.exports = mongoose.model('article', ArticleSchema)
