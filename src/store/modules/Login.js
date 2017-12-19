import axios from 'axios'

const state = {}
// getters
const getters = {}

// actions
const actions = {
  login ({commit}, user) {
    return axios.get(`/service/user/session?uname=${user.username}&pwd=${user.password}`)
  }
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
