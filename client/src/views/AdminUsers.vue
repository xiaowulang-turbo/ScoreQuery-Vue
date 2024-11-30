<template>
  <div class="admin-users">
    <el-card>
      <div class="header">
        <h2>用户管理</h2>
        <el-button type="primary" @click="openAddUserModal">添加用户</el-button>
      </div>
      <el-table :data="users" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="userId" label="考生号" width="150" />
        <el-table-column prop="role" label="身份" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.role === 'admin' ? 'success' : 'info'">
              {{ scope.row.role === 'admin' ? '管理员' : '学生' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="birthDate" label="出生日期" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.birthDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="openEditModal(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteUser(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑/添加用户模态框 -->
    <el-dialog
      :title="editingUser ? '编辑用户' : '添加用户'"
      :visible.sync="isModalVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="考生号" prop="userId">
          <el-input v-model="form.userId" :disabled="editingUser !== null" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-select v-model="form.role">
            <el-option label="学生" value="student" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-date-picker
            v-model="form.birthDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isModalVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, addUser, updateUser, deleteUser } from '../api/users.js'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [],
      loading: false,
      isModalVisible: false,
      editingUser: null,
      form: {
        name: '',
        userId: '',
        password: '',
        gender: '',
        role: 'student',
        birthDate: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        userId: [{ required: true, message: '请输入考生号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6个字符', trigger: 'blur' },
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        role: [{ required: true, message: '请选择身份', trigger: 'change' }],
        birthDate: [
          { required: true, message: '请选择出生日期', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await getUsers()
        this.users = response.data
      } catch (error) {
        ElMessage.error('无法获取用户列表，请稍后再试')
      } finally {
        this.loading = false
      }
    },
    openAddUserModal() {
      this.editingUser = null
      this.isModalVisible = true
      this.form = {
        name: '',
        userId: '',
        password: '',
        gender: '',
        role: 'student',
        birthDate: '',
      }
    },
    openEditModal(user) {
      this.editingUser = user
      this.isModalVisible = true
      this.form = { ...user }
    },
    async handleSave() {
      try {
        await this.$refs.formRef.validate()
        if (this.editingUser) {
          // 编辑用户
          const response = await updateUser(this.editingUser._id, this.form)
          ElMessage.success('用户信息更新成功')
          this.users = this.users.map(user =>
            user._id === response.data._id ? response.data : user
          )
        } else {
          // 添加用户
          const response = await addUser(this.form)
          ElMessage.success('用户添加成功')
          this.users.push(response.data)
        }
        this.isModalVisible = false
      } catch (error) {
        ElMessage.error('操作失败，请稍后再试')
      }
    },
    async deleteUser(id) {
      try {
        await ElMessageBox.confirm('确定删除该用户吗？', '提示', {
          type: 'warning',
        })
        await deleteUser(id)
        ElMessage.success('用户删除成功')
        this.users = this.users.filter(user => user._id !== id)
      } catch (error) {
        ElMessage.error('删除失败，请稍后再试')
      }
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : ''
    },
  },
  mounted() {
    this.fetchUsers()
  },
}
</script>

<style scoped>
.admin-users .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
