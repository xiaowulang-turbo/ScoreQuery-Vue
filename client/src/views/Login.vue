<template>
  <el-card class="login-card">
    <h2>四六级查分系统</h2>
    <el-form :model="form" :rules="rules" ref="loginForm">
      <el-form-item label="考生号" prop="userId">
        <el-input v-model="form.userId" />
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
import { login } from '../api/auths'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const form = reactive({ userId: '', password: '' })
    const loginForm = ref(null)
    const rules = {
      userId: [{ required: true, message: '请输入考生号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }

    const onSubmit = async () => {
      try {
        await loginForm.value.validate()
        console.log(form, form.userId, form.password)
        const { data } = await login({
          userId: form.userId,
          password: form.password,
        })
        store.commit('setUser', data[0].role)
        // store.commit('setToken', data.token)

        if (data[0].role === 'admin') router.push('/admin/scores')
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
