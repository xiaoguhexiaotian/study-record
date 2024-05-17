import Vue from 'vue'
import Vuex from 'vuex'
import { IType, IGoods } from './type'
import { AXIOX_HANDLE, SET_GOODS } from './constant'
import { getGoodsList } from './api'

const initState: IType = {
  goodsList: [{
    name: '小米',
    price: 2000
  },
  {
    name: '苹果',
    price: 5000
  }
  ]
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: initState,
  getters: {
    getGoodsList(state, getters) {
      return state?.goodsList || getters.getGoodsList
    },
    getGoodsInfo: (state, getters) => (name: string) => {
      console.log('state====>', state, 'getters====>', getters, 'name====>', name);
      return state?.goodsList?.filter((item: IGoods) => {
        return item.name === name
      })
    }
  },
  mutations: {
    [SET_GOODS](state, goods: IGoods | IGoods[]) {
      if (Array.isArray(goods)) {
        state.goodsList?.push(...goods)
      } else {
        state.goodsList?.push(goods)
      }
      console.log('mutations====>', state, goods)
    },
  },
  actions: {
    async [AXIOX_HANDLE](context) {
      // const promise = await getGoodsList() as IGoods[]
      getGoodsList().then(res => {
        context.commit(SET_GOODS, res as IGoods[])
      })
    }
  },
  modules: {
  }
})
