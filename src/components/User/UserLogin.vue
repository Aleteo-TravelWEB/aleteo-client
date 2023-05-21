<template>
  <div class="signin">
    <div class="sign-container">
      <div class="signin">
        <form id="signin-form" method="POST" action="${root}/user/signin" role="search">
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
                @keyup.enter="confirm"
              />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-4 me-2">
              <div id="find-password" class="hover-div" @click="moveFindPwd()">비밀번호 찾기</div>
            </div>
          </div>
          <div
            id="login-result-div"
            class="row d-flex justify-content-center my-4"
            v-if="isLoginConfirm"
          >
            <div :class="{ 'shake-effect': isShaking }" style="color: crimson">
              아이디 또는 비밀번호를 확인해주세요.
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
                :class="{ 'shake-effect': isShaking }"
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- 모달 창 start -->
    <div v-if="showModal" class="modal shadow">
      <div class="modal-content container">
        <div class="hover-div d-flex flex-end mb-3" @click="closeModal()">
          <b-icon icon="x-circle-fill" variant="danger"></b-icon>
        </div>
        <h4 class="text-secondary mb-3">
          <b-icon icon="key-fill"></b-icon> <strong>비밀번호 찾기</strong>
        </h4>
        <div class="container">
          <div class="mt-2 mb-2 d-flex justify-content-center col-12">
            <b-input-group class="px-2 d-flex justify-content-center">
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <input
                type="text"
                class="form-control col-12"
                id="find-user-id"
                placeholder="아이디를 입력해주세요"
                v-model="findUser.userId"
              />
            </b-input-group>
          </div>
          <div class="mt-4"></div>
          <div class="mt-2 mb-2 d-flex justify-content-center col-12">
            <b-input-group class="px-2 d-flex justify-content-center">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <input
                type="text"
                class="form-control col-5"
                id="find-user-id"
                v-model="findUser.emailId"
                placeholder="이메일"
              />
              <span class="border col-1 d-flex justify-content-center align-items-center">@</span>
              <b-form-select
                :options="domains"
                class="col-5"
                v-model="findUser.emailDomain"
              ></b-form-select>
            </b-input-group>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-2" v-if="isShowPwdResult">
          <div :class="{ 'shake-effect': isShakingModal }" style="color: crimson">
            아이디 또는 이메일을 확인해주세요.
          </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
          <b-button variant="outline-primary" class="mx-5" @click="findPwd()">전송</b-button>
        </div>
      </div>
    </div>
    <!-- 모달 창 end -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserLogin",
  components: {},
  data() {
    return {
      saveId: false,
      user: {
        userId: null,
        userPwd: null,
      },
      isLoginConfirm: false,
      isShaking: false,
      isShakingModal: false,
      showModal: false, // 모달 창
      domains: [
        { value: null, text: "선택" },
        { value: "ssafy.com", text: "싸피" },
        { value: "google.com", text: "구글" },
        { value: "naver.com", text: "네이버" },
        { value: "kakao.com", text: "카카오" },
      ],
      findUser: {
        userId: null,
        emailId: null,
        emailDomain: null,
      },
      isShowPwdResult: false,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo", "isSendPwdMail"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo", "sendUserPwdMail"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        this.isLoginConfirm = false;
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "main" });
      } else {
        this.isLoginConfirm = true;
        this.isShaking = true;

        setTimeout(() => {
          this.isShaking = false;
        }, 1000);
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
    ////////////////// 비밀번호 찾기 start //////////////////
    async findPwd() {
      console.log("findUser :: ");
      console.log(this.findUser);
      await this.sendUserPwdMail(this.findUser);
      if (this.isSendPwdMail) {
        alert("메일 전송이 완료되었습니다.");
        this.showModal = false;
      } else {
        this.isShowPwdResult = true;
        this.isShakingModal = true;

        setTimeout(() => {
          this.isShakingModal = false;
        }, 1000);
      }
    },
    moveFindPwd() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.findUser = [];
      this.isShakingModal = false;
    },
    ////////////////// 비밀번호 찾기 end //////////////////
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

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake-effect {
  animation: shake 0.5s;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 15px;
  width: 70%;
  max-width: 600px;
}

.hover-div {
  cursor: pointer;
}

.hover-div:hover {
  color: #3f72af;
}
</style>
