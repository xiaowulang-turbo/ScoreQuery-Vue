import axios from 'axios'

const baseUrl = 'http://localhost:3010/users'

/**
 * 获取所有用户
 * @returns {Promise} - 返回用户列表
 */
export const getUsers = () => {
  return axios.get(baseUrl)
}

/**
 * 更新用户信息
 * @param {String} id - 用户 ID
 * @param {Object} userData - 更新的数据
 * @returns {Promise} - 返回更新后的用户数据
 */
export const updateUser = (id, userData) => {
  return axios.put(`${baseUrl}/${id}`, userData)
}

/**
 * 删除用户
 * @param {String} id - 用户 ID
 * @returns {Promise} - 返回删除成功的消息
 */
export const deleteUser = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

/**
 * 添加用户
 * @param {Object} userData - 用户数据
 * @returns {Promise} - 返回新添加的用户数据
 */

export const addUser = userData => {
  return axios.post(baseUrl, userData)
}
