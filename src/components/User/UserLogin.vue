<template>
  <div class="signin">
    <div class="sign-container">
      <div class="signin">
        <form
          id="signin-form"
          method="POST"
          action="${root}/user/signin"
          role="search"
        >

          <div class="row d-flex justify-content-center mt-4 ms-2">
            <h2>로그인</h2>
          </div>
          <hr />
          <div class="mt-4 ms-2 me-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="ok"
              id="saveid"
              name="saveid"
              v-model="saveId"
            />
            <label class="form-check-label" for="saveid"> 아이디저장 </label>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input
                type="text"
                v-model="user.userId"
                class="form-control"
                name="userId"
                id="signin-id"
                placeholder="아이디"
              />
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input
                type="password"
                v-model="user.userPwd"
                class="form-control"
                name="userPwd"
                id="signin-password"
                placeholder="비밀번호"
              />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4 me-2">
              <a href="${root}/user/password" id="find-password"
                >비밀번호 찾기</a
              >
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <button
                type="button"
                @click="confirm"
                id="signin-btn"
                class="btn submit-btn"
                style="width: 100%"
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const userStore = "userStore";

export default {
  name: 'UserLogin',
  components: {},
  data() {
    return {
      saveId: false,
      user: {
        userId: null,
        userPwd: null,
      }
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>

<style scoped>
.sign-container {
  display: inline-block;
  width: 430px;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin-top: 5rem;
}

.signin {
  text-align: center;
}

#find-password:link {
  color: #4d5054;
}

.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
}

.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
  color: white;
}
</style>