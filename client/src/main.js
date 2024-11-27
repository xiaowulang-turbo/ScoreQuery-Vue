import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'

const app = createApp(App)

app.use(ElementPlus).use(router).mount('#app')
