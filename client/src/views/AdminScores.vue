<template>
  <el-card>
    <div class="card-header">
      <h2>成绩管理</h2>
      <el-button type="primary" @click="showAddModal">添加成绩</el-button>
    </div>
    <el-table :data="scores" border style="width: 100%">
      <el-table-column prop="userId" label="考生号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="score" label="分数" />
      <el-table-column prop="level" label="考试级别" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="editScore(row)">编辑</el-button>
          <el-button type="text" @click="deleteScore(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isModalVisible" title="添加/编辑成绩">
      <el-form :model="currentScore" ref="scoreForm">
        <el-form-item label="考生号" prop="userId">
          <el-input v-model="currentScore.userId" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="currentScore.name" />
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="currentScore.score" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="saveScore">保存</el-button>
    </el-dialog>
  </el-card>
</template>

<script>
import { reactive, ref } from 'vue'
import { getScores, addScore, updateScore, deleteScore } from '../api/scores'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const scores = ref([])
    const isModalVisible = ref(false)
    const currentScore = reactive({})

    const fetchScores = async () => {
      try {
        const { data } = await getScores()
        if (!data) return
        scores.value = data
        ElMessage.success('获取成绩成功')
      } catch (error) {
        console.error(error)
        ElMessage.error('获取成绩失败')
      }
    }

    const showAddModal = () => {
      Object.assign(currentScore, {})
      isModalVisible.value = true
    }

    const editScore = score => {
      Object.assign(currentScore, score)
      isModalVisible.value = true
    }

    const saveScore = async () => {
      if (currentScore._id) {
        await updateScore(currentScore._id, currentScore)
      } else {
        await addScore(currentScore)
      }
      isModalVisible.value = false
      fetchScores()
    }

    const deleteScore = async _id => {
      await deleteScore(_id)
      fetchScores()
    }

    fetchScores()

    return {
      scores,
      isModalVisible,
      currentScore,
      showAddModal,
      editScore,
      saveScore,
      deleteScore,
    }
  },
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
