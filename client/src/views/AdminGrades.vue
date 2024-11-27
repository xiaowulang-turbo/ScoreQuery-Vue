<template>
  <el-card>
    <h2>成绩管理</h2>
    <el-button type="primary" @click="showAddModal">添加成绩</el-button>
    <el-table :data="grades" style="width: 100%">
      <el-table-column prop="exam_id" label="考生号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="score" label="分数" />
      <el-table-column prop="level" label="考试级别" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="editGrade(row)">编辑</el-button>
          <el-button type="text" @click="deleteGrade(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="isModalVisible" title="添加/编辑成绩">
      <el-form :model="currentGrade" ref="gradeForm">
        <el-form-item label="考生号" prop="exam_id">
          <el-input v-model="currentGrade.exam_id" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="currentGrade.name" />
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="currentGrade.score" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="saveGrade">保存</el-button>
    </el-dialog>
  </el-card>
</template>

<script>
import { reactive, ref } from 'vue'
import { getGrades, addGrade, updateGrade, deleteGrade } from '../api/grades'

export default {
  setup() {
    const grades = ref([])
    const isModalVisible = ref(false)
    const currentGrade = reactive({})

    const fetchGrades = async () => {
      const { data } = await getGrades()
      grades.value = data
    }

    const showAddModal = () => {
      Object.assign(currentGrade, {})
      isModalVisible.value = true
    }

    const editGrade = grade => {
      Object.assign(currentGrade, grade)
      isModalVisible.value = true
    }

    const saveGrade = async () => {
      if (currentGrade._id) {
        await updateGrade(currentGrade._id, currentGrade)
      } else {
        await addGrade(currentGrade)
      }
      isModalVisible.value = false
      fetchGrades()
    }

    const deleteGrade = async _id => {
      await deleteGrade(_id)
      fetchGrades()
    }

    fetchGrades()

    return {
      grades,
      isModalVisible,
      currentGrade,
      showAddModal,
      editGrade,
      saveGrade,
      deleteGrade,
    }
  },
}
</script>
