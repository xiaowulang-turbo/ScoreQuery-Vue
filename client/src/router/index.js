import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Query from '../views/Query.vue'
import AdminHome from '../views/AdminHome.vue'
import AdminGrades from '../views/AdminGrades.vue'
import AdminUsers from '../views/AdminUsers.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/query', component: Query },
  {
    path: '/admin',
    component: AdminHome,
    children: [
      { path: 'grades', component: AdminGrades },
      { path: 'users', component: AdminUsers },
    ],
  },
  {
    path: '/:catchAll(.*)', // 匹配所有未定义的路由
    component: () => import('../views/NotFound.vue'), // 导入 404 页面组件
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
