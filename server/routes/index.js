const Router = require('koa-router')
const authsRoutes = require('./auths')
const scoresRoutes = require('./scores')
const usersRoutes = require('./users')

const router = new Router({
  prefix: '/auth',
})

router.use('/login', authsRoutes.routes())
router.use('/score', scoresRoutes.routes())
router.use('/users', usersRoutes.routes())

module.exports = router
