import axios from 'axios'

const baseUrl = 'http://localhost:3010/grades'

/**
 * 获取所有成绩
 * @returns {Promise} - 返回成绩列表
 */
export const getGrades = () => {
  return axios.get(baseUrl)
}

/**
 * 添加成绩
 * @param {Object} gradeData - 成绩数据 { exam_id, name, level, score, examDate }
 * @returns {Promise} - 返回新添加的成绩
 */
export const addGrade = gradeData => {
  return axios.post(baseUrl, gradeData)
}

/**
 * 更新成绩
 * @param {String} id - 成绩 ID
 * @param {Object} gradeData - 更新的成绩数据
 * @returns {Promise} - 返回更新后的成绩
 */
export const updateGrade = (id, gradeData) => {
  return axios.put(`${baseUrl}/${id}`, gradeData)
}

/**
 * 删除成绩
 * @param {String} id - 成绩 ID
 * @returns {Promise} - 返回删除成功的消息
 */
export const deleteGrade = id => {
  return axios.delete(`${baseUrl}/${id}`)
}
