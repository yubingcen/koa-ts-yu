import File_col from './../models/files'
import { folder, getPath } from "../utils/folder";
import { resError, resBody } from "../utils/response";
import fs from 'fs'
import send from 'koa-send'
import uuidv1 from 'uuid/v1'
import gm from 'gm'
const imageMagick = gm.subClass({ imageMagick: true })

// 文件保存地址
const filePath = getPath('/static/upload')

const postFile = async (ctx: any, next: any) => {
  if (!folder('/static/upload')) {
      throw new Error('文件夹不存在！')
  }
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  const reader = fs.createReadStream(file.path)
  let fileResource = filePath + `/${file.name}`
  const upStream = fs.createWriteStream(fileResource)
  reader.pipe(upStream)
  // 创建缩略图
  if (file.type && file.type.split('/')[0] === 'image') {
    imageMagick(fileResource).resize(400).autoOrient().write(`${filePath}/thumb/${file.name}`, err => {
      console.log("err: " + err)
    })
  }
  // 将文件数据记录到数据库
  // 首先通过md5查看是否已经上传过当前图片
  const file_f = await File_col.findOne({
    md5: file.hash
  })
  if (file_f) {
    resBody({
      msg: '上传成功',
      file: file_f
    })
    return
  }

  // 没有上传过则写入数据
  const uuid = uuidv1();
  const file_d = await File_col.create({
    uuid,
    name: file.name,
    path: fileResource,
    type: file.type,
    md5: file.hash
  })

  ctx.status = 200
  resBody({
    msg: '上传成功',
    status: 'ok',
    file: {
      name: file.name,
      type: file.type,
      uuid: uuid
    }
  })
}

const getFile = async (ctx: any, next: any) => {
  const uuid = ctx.params.uuid
  const file_f = await File_col.findOne({
    uuid: uuid
  })
  if (file_f) {
    let path = '/static/upload/' + file_f.name
    if (ctx.query.thumb === '1' || ctx.query.thumb === 1) {
      path = '/static/upload/thumb/' + file_f.name
    }
    ctx.attachment(path)
    await send(ctx, path)
  } else {
    ctx.status = 404;
    ctx.body = null
  }
}

export { postFile, getFile }
