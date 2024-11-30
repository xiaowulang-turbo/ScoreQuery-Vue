const Router = require('koa-router')
const Score = require('../models/scores')

const router = new Router()

// 获取所有成绩
router.get('/', async ctx => {
  try {
    const scores = await Score.find()
    ctx.status = 200
    ctx.body = scores
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '获取成绩列表失败', error: error.message }
  }
})

// 根据考生号查询成绩
router.get('/:userId', async ctx => {
  const { userId } = ctx.params

  try {
    const score = await Score.findOne({ userId })
    if (!score) {
      ctx.status = 404
      ctx.body = { message: '未找到对应成绩' }
      return
    }
    ctx.status = 200
    ctx.body = score
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '查询成绩失败', error: error.message }
  }
})

// 新增成绩
router.post('/', async ctx => {
  const { userId, examDate, level, score, isPass } = ctx.request.body

  try {
    // 检查是否已存在成绩
    const existingScore = await Score.findOne({ userId, examDate, level })
    if (existingScore) {
      ctx.status = 400
      ctx.body = { message: '成绩记录已存在' }
      return
    }

    const score = new Score({ userId, examDate, level, score, isPass })
    const savedScore = await score.save()

    ctx.status = 201
    ctx.body = savedScore
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '新增成绩失败', error: error.message }
  }
})

// 更新成绩
router.put('/:id', async ctx => {
  const { id } = ctx.params
  const updateData = ctx.request.body

  try {
    const updatedScore = await Score.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedScore) {
      ctx.status = 404
      ctx.body = { message: '未找到对应成绩' }
      return
    }

    ctx.status = 200
    ctx.body = updatedScore
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '更新成绩失败', error: error.message }
  }
})

// 删除成绩
router.delete('/:id', async ctx => {
  const { id } = ctx.params

  try {
    const deletedScore = await Score.findByIdAndDelete(id)
    if (!deletedScore) {
      ctx.status = 404
      ctx.body = { message: '未找到对应成绩' }
      return
    }

    ctx.status = 200
    ctx.body = { message: '成绩已删除' }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '删除成绩失败', error: error.message }
  }
})

module.exports = router
