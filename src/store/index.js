import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/api/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    attractions: [],
    attraction: null,
  },
  getters: {
  },
  mutations: {
    //////////////////// Attraction start ////////////////////`
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      if (!Array.isArray(guguns)) {
        console.log(guguns);
        return;
      }
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_ATTRACTION_LIST(state) {
      state.attractions = [];
      state.attraction = null;
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    SET_ATTRACTION_LIST(state, attractions) {
      state.attractions = attractions;
    },
    SET_DETAIL_ATTRACTION(state, attraction) {
      state.attraction = attraction;
    }
    //////////////////// Attraction end ////////////////////`
  },
  actions: {
    //////////////////// Attraction start ////////////////////`
    getSido({ commit }) {
      http
        .get(`/attraction/sido`)
        .then(({ data }) => {
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      http
        .get(`/attraction/gugun`, { params })
        .then(({ data }) => {
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAttractionList({ commit },[sidoCode, gugunCode]) {
      const SERVICE_KEY = process.env.VUE_APP_TRIP_DEAL_API_KEY;
      const SERVICE_URL = 
        "https://apis.data.go.kr/B551011/KorService1/areaBasedList1";
      const params = {
        serviceKey: decodeURIComponent(SERVICE_KEY),
        numOfRows: 30,
        pageNo: 1,
        MobileOS: "ETC",
        MobileApp: "AppTest",
        _type: "json",
        listYN: "Y",
        arrange: "A",
        contentTypeId: 12,
        areaCode: sidoCode,
        sigunguCode: gugunCode
      };
      console.log("areaCode: " + sidoCode + ", gugunCode: " + gugunCode)
      http
        .get(SERVICE_URL, { params })
        .then(({ data }) => {
          console.log(data.response.body.items.item);
          commit("SET_ATTRACTION_LIST", data.response.body.items.item);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailAttr({ commit }, attraction) {
      commit("SET_DETAIL_ATTRACTION", attraction);
    },
    //////////////////// Attraction end ////////////////////`
  },
  modules: {
  }
})
