<template>
  <el-card class="query-card">
    <h2>成绩查询</h2>
    <el-form :model="queryForm" label-width="100px" class="query-form">
      <el-form-item label="考生号">
        <el-input v-model="queryForm.userId" placeholder="请输入考生号" />
      </el-form-item>
      <el-button type="primary" @click="onQuery">查询成绩</el-button>
    </el-form>
    <el-divider></el-divider>
    <el-table
      v-if="flatTableData.length"
      :data="flatTableData"
      style="width: 100%"
    >
      <el-table-column prop="userId" label="考生号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="level" label="考试级别" />
      <el-table-column prop="examDate" label="考试时间" />
      <el-table-column prop="totalScore" label="总分" />
      <el-table-column prop="listening" label="Listening" />
      <el-table-column prop="reading" label="Reading" />
      <el-table-column prop="writing" label="Writing" />
      <el-table-column label="是否通过" v-slot="{ row }">
        <el-tag :type="row.totalScore >= 426 ? 'success' : 'danger'">
          {{ row.totalScore >= 60 ? '通过' : '未通过' }}
        </el-tag>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reactive } from 'vue'
import { getScore } from '../api/scores'
import dayjs from 'dayjs'

export default {
  computed: {
    flatTableData() {
      if (!this.score?.value) return []
      const { userId, name, scores } = this.score.value
      if (!scores) return []
      return scores.map(score => ({
        userId,
        name,
        level: score.level,
        examDate: dayjs(score.examDate).format('YYYY-MM-DD'),
        totalScore: score.score,
        listening: score.details.listening,
        reading: score.details.reading,
        writing: score.details.writing,
      }))
    },
  },
  setup() {
    const queryForm = reactive({
      userId: '',
    })
    const score = reactive({
      value: {},
    })

    const onQuery = async () => {
      try {
        const { data } = await getScore(queryForm.userId)
        if (!data) {
          score.value = null
          return
        }
        console.log(data)
        score.value = data
      } catch (error) {
        score.value = null
        console.error('查询失败:', error)
      }
    }

    return { queryForm, score, onQuery }
  },
}
</script>

<style>
.query-card {
  /* width: 600px; */
  margin: 50px auto;
  padding: 20px;
}
.query-form {
  display: flex;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
