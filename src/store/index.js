import Vue from 'vue'
import Vuex from 'vuex'
// import http from '@/api/http'
import createPersistedState from "vuex-persistedstate";

import userStore from '@/store/modules/userStore';
import planStore from '@/store/modules/planStore';
import attractionStore from '@/store/modules/attractionStore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserId: "ssafy"
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    planStore,
    attractionStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ]
})
