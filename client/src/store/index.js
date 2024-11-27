import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    logout(state) {
      state.user = null
      state.token = ''
    },
  },
  actions: {},
  getters: {
    isAuthenticated: state => !!state.token,
  },
})
