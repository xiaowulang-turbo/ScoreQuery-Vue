<template>
  <el-card class="login-card">
    <h2>四六级查分系统</h2>
    <el-form :model="form" :rules="rules" ref="loginForm">
      <el-form-item label="考生号" prop="exam_id">
        <el-input v-model="form.exam_id" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, ref } from 'vue'
// import { login } from '../api/auth'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = reactive({ exam_id: '', password: '' })
    const loginForm = ref(null)
    const rules = {
      exam_id: [{ required: true, message: '请输入考生号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }

    const onSubmit = async () => {
      try {
        const { data } = await login(form.exam_id, form.password)
        store.commit('setUser', data.user)
        store.commit('setToken', data.token)

        if (data.user.role === 'admin') router.push('/admin/grades')
        else router.push('/query')
      } catch (error) {
        console.error('登录失败:', error)
      }
    }

    return { form, rules, onSubmit, loginForm }
  },
}
</script>

<style>
.login-card {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
}
</style>
