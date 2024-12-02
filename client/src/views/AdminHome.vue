<template>
  <div class="common-layout">
    <el-container>
      <el-header>四六级查分系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1">
            <el-menu-item @click="goToUsers">用户管理</el-menu-item>
            <el-menu-item @click="goToScores">成绩管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const goToUsers = () => {
      router.push('/admin/users')
    }
    const goToScores = () => {
      router.push('/admin/scores')
    }
    return { goToUsers, goToScores }
  },
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
