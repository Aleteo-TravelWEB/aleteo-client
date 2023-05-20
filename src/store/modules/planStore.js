import { regist, modify } from "@/api/plan";


const planStore = {
  namespaced: true,
  state: {
    isRegist: false,
    isModify: false,
  },
  mutations: {
    SET_IS_REGIST: (state, isRegist) => {
      // console.log("isRegist :: " + isRegist);
      state.isRegist = isRegist;
    },
    SET_IS_MODIFY: (state, isModify) => {
      state.isModify = isModify;
    }
  },
  actions: {
    async planRegist({ commit }, [plan, places]) {
      await regist(
        [plan, places],
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_REGIST", true);
          } else {
            commit("SET_IS_REGIST", false);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },
    async planModify({ commit }, [plan, places]) {
      await modify(
        [plan, places],
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_MODIFY", true);
          } else {
            commit("SET_IS_MODIFY", false);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
};

export default planStore;