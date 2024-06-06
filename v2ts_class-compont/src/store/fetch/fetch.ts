import Vue from 'vue'
import Vuex from 'vuex'
import * as ApiService from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiData: {},
    apiDataTimestamp: null,
  },
  mutations: {
    setApiData(state, { data, timestamp }) {
      state.apiData = data
      state.apiDataTimestamp = timestamp
    },
  },
  actions: {
    async fetchData({ commit, state }) {
      // 检查是否超时
      if (!state.apiDataTimestamp || Date.now() - state.apiDataTimestamp > 6000) {
        console.log('走接口')
        const data = await ApiService.getData()
        commit('setApiData', { data, timestamp: Date.now() })
        return data
      } else {
        console.log('走缓存')
        return Promise.resolve(state.apiData)
      }
    },
  },
  getters: {
    getApiData: state => state.apiData,
  },
})