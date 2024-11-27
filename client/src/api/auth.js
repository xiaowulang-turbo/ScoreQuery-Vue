import axios from 'axios'

const baseUrl = 'http://localhost:3010/auth'

/**
 * 登录用户
 * @param {Object} credentials - 用户凭据 { exam_id, password }
 * @returns {Promise} - 返回用户信息和 token
 */
export const login = credentials => {
  return axios.post(`${baseUrl}/login`, credentials)
}

/**
 * 注册用户
 * @param {Object} userData - 用户注册信息 { exam_id, password, name, gender, role }
 * @returns {Promise} - 返回成功或失败的响应
 */
export const register = userData => {
  return axios.post(`${baseUrl}/register`, userData)
}

/**
 * 查询用户成绩
 * @param {String} exam_id - 用户考生号
 * @returns {Promise} - 返回用户成绩
 */
export const queryGrade = exam_id => {
  return axios.post(`${baseUrl}/query`, { exam_id })
}
