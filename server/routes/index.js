const Router = require('koa-router')
const authRoutes = require('./auth')
const scoresRoutes = require('./scores')
const usersRoutes = require('./users')

const router = new Router({
  prefix: '/auth',
})

router.use('/login', authRoutes.routes())
router.use('/score', scoresRoutes.routes())
router.use('/users', usersRoutes.routes())

module.exports = router
