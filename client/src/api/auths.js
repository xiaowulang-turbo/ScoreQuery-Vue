import axios from 'axios'

const baseUrl = 'http://localhost:3010/auths'

/**
 * 登录用户
 * @param {Object} credentials - 用户凭据 { userId, password }
 * @returns {Promise} - 返回用户信息和 token
 */
export const login = credentials => {
  return axios.post(`${baseUrl}/login`, credentials)
}

/**
 * 注册用户s
 * @param {Object} userData - 用户注册信息 { userId, password, name, gender, role }
 * @returns {Promise} - 返回成功或失败的响应
 */
export const register = userData => {
  return axios.post(`${baseUrl}/register`, userData)
}

/**
 * 查询用户成绩
 * @param {String} userId - 用户考生号
 * @returns {Promise} - 返回用户成绩
 */
export const queryScore = userId => {
  return axios.post(`${baseUrl}/query`, { userId })
}
