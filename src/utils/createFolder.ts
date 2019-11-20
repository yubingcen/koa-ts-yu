import fs from 'fs'
import path from 'path'
import { resError } from './response'

const create = (relPath: string) => { // 根据根目录为路径的相对路径
  const filePath = path.resolve(__dirname, '../..') + relPath

  if (!fs.existsSync(filePath)) {  //判断文件夹是否存在，如果不存在就新建一个
    let ERROR = null
    try{
      fs.mkdir(filePath, (err: any) => {
      if (err) {
        ERROR = err
        resError('文件夹创建失败', err)
        throw new Error(err)
      }
    })
    } catch (err) {
    } finally {
      if (ERROR) {
        return false
      } else {
        return true
      }
    }
  } else {
    return true
  }
}

export default create