const Router = require('koa-router')
const Auth = require('../models/auths')

const router = new Router()

// login
router.post('/login', async ctx => {
  console.log(ctx.request.body)
  const { userId, password } = ctx.request.body
  try {
    const auth = await Auth.find({ userId, password })
    if (!auth) {
      ctx.status = 401
      ctx.body = { message: '用户名或密码错误' }
    }
    ctx.status = 200
    ctx.body = auth
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '登录失败', error: error.message }
  }
})

// register
// router.post('/', async ctx => {
//   try {
//     const { userId, password } = ctx.request.body
//     const auth = await Auth.create({ userId, password })
//     if (!auth) {
//       ctx.status = 401
//       ctx.body = { message: '注册失败' }
//     }
//     ctx.status = 201
//     ctx.body = auth
//   } catch (error) {
//     ctx.status = 500
//     ctx.body = { message: '注册失败', error: error.message }
//   }
// })

module.exports = router
