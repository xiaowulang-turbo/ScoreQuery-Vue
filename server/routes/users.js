const Router = require('koa-router')
const Score = require('../models/users')

const router = new Router()

// 获取所有用户
router.get('/', async ctx => {
  try {
    const users = await Score.find()
    ctx.status = 200
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '获取用户列表失败', error: error.message }
  }
})

// 新增用户
router.post('/', async ctx => {
  const { name, exam_id, password, gender, role, birthDate } = ctx.request.body

  try {
    // 检查用户是否存在
    const existingUser = await Score.findOne({ exam_id })
    if (existingUser) {
      ctx.status = 400
      ctx.body = { message: '该考生号已存在' }
      return
    }

    const user = new Score({ name, exam_id, password, gender, role, birthDate })
    const newUser = await user.save()

    ctx.status = 201
    ctx.body = newUser
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '创建用户失败', error: error.message }
  }
})

// 更新用户信息
router.put('/:id', async ctx => {
  const { id } = ctx.params
  const updateData = ctx.request.body

  try {
    const updatedUser = await Score.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      ctx.status = 404
      ctx.body = { message: '用户不存在' }
      return
    }

    ctx.status = 200
    ctx.body = updatedUser
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '更新用户信息失败', error: error.message }
  }
})

// 删除用户
router.delete('/:id', async ctx => {
  const { id } = ctx.params

  try {
    const deletedUser = await Score.findByIdAndDelete(id)
    if (!deletedUser) {
      ctx.status = 404
      ctx.body = { message: '用户不存在' }
      return
    }

    ctx.status = 200
    ctx.body = { message: '用户已删除' }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '删除用户失败', error: error.message }
  }
})

module.exports = router
