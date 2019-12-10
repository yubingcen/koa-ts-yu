# Koa2-TS
### 基于koa2的自己的建站基础模板，使用TypeScript，目前功能简单，处于前期开发状态。

## 建议环境 
- [x] Koa2
- [x] TypeScript
- [x] NodeJS
- [x] MongoDB
- [x] Redis


## 安装
- 安装依赖 
> `yarn`
- 生成修改配置
> `cp ./src/config/configs.ts.example ./src/config/configs.ts`
- 本地开发 
> `yarn run server`

## **安装注意：**
#### 缩略图生成采用 [gm](http://aheckmann.github.io/gm/docs.html "GM") 和 [ImageMagick](https://imagemagick.org/index.php "ImageMagick")
- ImageMagick安装 
> `sudo apt-get install imagemagick`
- ImageMagick
在 **windows** 平台中使用Nodejs中的gm模块处理图片时，如果不安装、安装imageGagick.exe版本不对或安装选项不对时都会报类似于`“{ [Error: Command failed: aaЧaaaa ] code: 4, signal: null }”`的错。
7.0版本安装时必须勾选"Install legacy utilities(e.g. convert)"选项，否则会报错。

## 目录结构
<pre>
.
├──logs                       // 生成日志文件
├──src
│    ├── models                   // model层 处理数据
│    ├── config                   // 配置文件
│    ├── common                   // 公用的
│    ├── utils                    // 工具
│    ├── controller               // 控制层
│    ├── routes                   // 路由
│    ├── index.ts                 // 入口文件
├── .gitignore               //git忽略文件
├── package.json             // 项目配置文件
</pre>

## 计划功能
- [x] 用户管理
    - [x] 注册
    - [x] 登陆
    - [ ] 用户权限
- [ ] 权限管理
- [ ] 邮件模板
    - [ ] 修改密码（邮件发送）
- [ ] 权限管理
- [x] 文件管理
    - [x] 文件存储
    - [x] 缩略图生成
- [x] 日志管理
    - [x] 日志生成
    - [ ] 报错管理
- [ ] 文章管理
    - [ ] 文章模块
    - [ ] 文章编辑
- [ ] 功能开关
    - [ ] 基础功能模块

## 计划项目优化
- [ ] webpack集成
- [ ] 代码风格限制/重写
- [ ] 增加biz层
- [ ] 接口文档生成
- [ ] 接口测试
