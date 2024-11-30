import axios from 'axios'

const baseUrl = 'http://localhost:3010/scores'

/**
 * 获取所有成绩
 * @returns {Promise} - 返回成绩列表
 */
export const getScores = () => {
  return axios.get(baseUrl)
}

/**
 * 根据用户 ID 获取成绩
 * @param {String} userId - 用户 ID
 */

export const getScore = userId => {
  return axios.get(`${baseUrl}/${userId}`)
}

/**
 * 添加成绩
 * @param {Object} scoreData - 成绩数据 { userId, name, level, score, examDate }
 * @returns {Promise} - 返回新添加的成绩
 */
export const addScore = scoreData => {
  return axios.post(baseUrl, scoreData)
}

/**
 * 更新成绩
 * @param {String} id - 成绩 ID
 * @param {Object} scoreData - 更新的成绩数据
 * @returns {Promise} - 返回更新后的成绩
 */
export const updateScore = (id, scoreData) => {
  return axios.put(`${baseUrl}/${id}`, scoreData)
}

/**
 * 删除成绩
 * @param {String} id - 成绩 ID
 * @returns {Promise} - 返回删除成功的消息
 */
export const deleteScore = id => {
  return axios.delete(`${baseUrl}/${id}`)
}
