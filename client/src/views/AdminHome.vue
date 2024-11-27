<template>
  <el-card class="admin-home">
    <h2>管理员首页</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <h3>用户管理</h3>
          <el-button type="primary" @click="goToUsers">管理用户</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>成绩管理</h3>
          <el-button type="primary" @click="goToGrades">管理成绩</el-button>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const goToUsers = () => {
      router.push('/admin/users')
    }
    const goToGrades = () => {
      router.push('/admin/grades')
    }
    return { goToUsers, goToGrades }
  },
}
</script>

<style>
.admin-home {
  width: 800px;
  margin: 50px auto;
}
</style>
