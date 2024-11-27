<template>
  <el-card class="query-card">
    <h2>成绩查询</h2>
    <el-form :model="queryForm" label-width="100px" class="query-form">
      <el-form-item label="考生号">
        <el-input v-model="queryForm.exam_id" placeholder="请输入考生号" />
      </el-form-item>
      <el-button type="primary" @click="onQuery">查询成绩</el-button>
    </el-form>
    <el-divider></el-divider>
    <el-table v-if="grade" :data="[grade]" style="width: 100%">
      <el-table-column prop="exam_id" label="考生号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="level" label="考试级别" />
      <el-table-column prop="examDate" label="考试时间" />
      <el-table-column prop="score" label="分数" />
      <el-table-column label="是否通过" v-slot="{ row }">
        <el-tag :type="row.score >= 60 ? 'success' : 'danger'">
          {{ row.score >= 60 ? '通过' : '未通过' }}
        </el-tag>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reactive } from 'vue'
// import { queryGrade } from '../api/grades'

export default {
  setup() {
    const queryForm = reactive({
      exam_id: '',
    })
    const grade = reactive(null)

    const onQuery = async () => {
      try {
        const { data } = await queryGrade(queryForm.exam_id)
        grade.value = data
      } catch (error) {
        grade.value = null
        console.error('查询失败:', error)
      }
    }

    return { queryForm, grade, onQuery }
  },
}
</script>

<style>
.query-card {
  width: 600px;
  margin: 50px auto;
  padding: 20px;
}
.query-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
