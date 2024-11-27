const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const mongoose = require('mongoose')
const Router = require('koa-router')
require('dotenv').config() // 加载 .env 文件中的环境变量

// const authRoutes = require('./routes/auth')
const scoreRoutes = require('./routes/scores')
const usersRoutes = require('./routes/users')

const app = new Koa()
const router = new Router()

// 中间件配置
app.use(cors()) // 允许跨域
app.use(bodyParser()) // 解析请求体为 JSON

// 数据库连接
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Cet-Scores-Vue'

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('数据库连接失败:', err))

// 路由配置
// router.use('/auth', authRoutes.routes())
router.use('/scores', scoreRoutes.routes())
router.use('/users', usersRoutes.routes())
app.use(router.routes()).use(router.allowedMethods())

// 服务器启动
const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
  console.log(`服务器已启动，访问地址：http://localhost:${PORT}`)
})
