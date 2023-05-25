import http from '@/api/http'

const attractionStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    types: [
      { id: 12, name: '관광지' },
      { id: 14, name: '문화시설' },
      { id: 15, name: '축제공연행사' },
      { id: 25, name: '여행코스' },
      { id: 28, name: '레포츠' },
      { id: 32, name: '숙박' },
      { id: 38, name: '쇼핑' },
      { id: 39, name: '음식점' }
    ],
    checkedTypes: [], // 선택된 체크박스 값들이 저장될 배열
    attractions: [],
    attraction: null,
    positions: [],
    isSearch: false,
    clickAttr: null, // 선택한 관광지
    clicks: [], // 선택한 관광지 반환 정보
  },
  getters: {
    getClicks: function(state) {
      return state.clicks;
    }
  },
  mutations: {
    //////////////////// Attraction start ////////////////////`
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시/도" }];
    },
    CLEAR_ATTRACTION_LIST(state) {
      state.attractions = [];
      state.attraction = null;
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구/군" }];
    },
    CLEAR_TYPE_LIST(state) {
      state.checkedTypes = [];
    },
    CLEAR_POSITION_LIST(state) {
      state.positions = [];
    },
    CLEAR_CLICK_LIST(state) {
      state.clicks = [];
    },
    CLEAR_IS_SEARCH(state) {
      state.isSearch = false;
    },
    SET_TYPE(state, contentTypeIds) {
      state.checkedTypes = Object.values(contentTypeIds).map((type) => type.id);
    },
    SET_TYPE_LIST(state) {
      state.checkedTypes = Object.values(state.types).map((type) => type.id);
    },
    SET_ATTRACTION_LIST(state, attractions) {
      state.attractions = attractions;
    },
    SET_DETAIL_ATTRACTION(state, attraction) {
      state.attraction = attraction;
    },
    SET_POSITION_LIST(state, positions) {
      positions.forEach((position) => {
        state.positions.push({
          title: position["title"],
          lat: position["mapy"],
          lng: position["mapx"],
          image: position["firstimage"],
          addr: position["addr1"],
          zipcode: position["zipcode"],
          tel: position["tel"]
        })
      })
    },
    SET_CLICK_LIST(state, clicks) {
      console.log(clicks);
      state.clicks = clicks;
    },
    SET_IS_SEARCH(state, search) {
      state.isSearch = search;
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
    getType({ commit }, contentTypeIds) {
      commit("SET_TYPE", contentTypeIds);
    },
    getTypeList({ commit }) {
      commit("SET_TYPE_LIST");
    },
    getAttractionList({ commit }, [sidoCode, gugunCode, contentTypeIds]) {
      const SERVICE_KEY = process.env.VUE_APP_TRIP_API_KEY;
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
        areaCode: sidoCode,
        sigunguCode: gugunCode
      };

      // 관광지 유형을 선택한 만큼 정보 가져오기
      contentTypeIds.forEach((type) => {
        params[`contentTypeId`] = type;

        http
          .get(SERVICE_URL, { params })
          .then(({ data }) => {
            commit("SET_ATTRACTION_LIST", data.response.body.items.item);
            commit("SET_POSITION_LIST", data.response.body.items.item);
          })
          .catch((error) => {
            console.log(error);
          });
      })
    },
    detailAttr({ commit }, attraction) {
      commit("SET_DETAIL_ATTRACTION", attraction);
    },
    getClickAttr({ commit }, clickTitle) {
      http
        .get(`/attraction/detail/${clickTitle}`)
        .then(({ data }) => {
          if (data) {
            commit("SET_CLICK_LIST", data);
            commit("SET_IS_SEARCH", true);
          }
        })
        .catch((error) => { 
          console.log(error); 
        })
    }
    //////////////////// Attraction end ////////////////////`
  },
};

export default attractionStore;