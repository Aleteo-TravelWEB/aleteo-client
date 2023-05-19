import { regist } from "@/api/plan";


const planStore = {
  namespaced: true,
  state: {
    isRegist: false,
  },
  mutations: {
    SET_IS_REGIST: (state, isRegist) => {
      console.log("isRegist :: " + isRegist);
      state.isRegist = isRegist;
    },
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
    }
  }
};

export default planStore;