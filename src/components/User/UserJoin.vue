<template>
  <div class="signin">
    <div class="sign-container">
      <div class="signin">
        <form id="signin-form" method="POST" action="${root}/user/signin" role="search">
          <div class="row d-flex justify-content-center mt-4 ms-2">
            <h2>회원가입</h2>
          </div>
          <hr />
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input ref="image" type="file" @change="userProfile" style="display: none" />
            </div>
            <div class="border p-4 image-content" @click="clickInputTag()" v-if="!user.image">
              <svg
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style="width: 30px; height: 30px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div v-else>
              <b-icon
                icon="check-circle"
                variant="success"
                class="image-content"
                font-scale="5"
                @click="clickInputTag()"
              />
            </div>
          </div>
          <div class=" d-flex justify-content-center mt-4 mb-3">
            <div style="width: 400px;">
              <input
                type="text"
                v-model="user.userName"
                class="form-control"
                name="userName"
                id="signin-name"
                placeholder="이름"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center my-4">
            <div style="width: 400px;">
              <input
                type="text"
                v-model="user.userId"
                class="form-control"
                name="userId"
                id="joinin-id"
                placeholder="아이디"
                @keyup="confirmId"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center my-4">
            <div style="width: 400px;">
              <div id="check-id-result"></div>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-4 mb-3">
            <div style="width: 400px;">
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
          <div class="d-flex justify-content-center mt-4 mb-3">
            <div style="width: 400px;">
              <input
                type="password"
                v-model="pwdCheck"
                class="form-control"
                name="pwdcheck"
                id="signin-pwdcheck"
                placeholder="비밀번호 확인"
                @focus="addFocusStyle"
                @blur="removeFocusStyle"
                @keyup="confirmPwd"
              />
            </div>
          </div>
          <div class="d-flex row justify-content-center mt-4 mb-3">
            <div class="d-flex align-items-center">
              <input
                style="width: 200px;"
                type="text"
                v-model="user.emailId"
                class="form-control"
                name="emailId"
                id="signin-emailId"
                placeholder="이메일아이디"
              />
              <span class="mx-1 d-flex justify-content-center align-items-center">@</span>

              <b-form-select style="width:100px;" v-model="user.emailDomain" :options="domains"></b-form-select>
              <div class="mx-1 p-2 admin" @click="sendEmail">인증<br/>보내기</div>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-2" v-if="isShowAdmin">
            <input class="form-input p-3" type="text" style="width: 400px; border: 1px solid black; border-radius:20px;" v-model="adminNumber" placeholder="입력 후 엔터" @keyup.enter="adminCheck">
          </div>
          <div class="d-flex justify-content-center mt-2" v-if="adminResultDiv">
            <p style="color: #0261ce;">이메일 인증이 완료되었습니다.</p>
          </div>
          <div class="d-flex justify-content-center mt-2" v-if="isShowJoin">
            <div :class="{ 'shake-effect': isShaking }" style="color: crimson">
              양식에 맞게 다시 제출해주세요
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <button
                type="button"
                @click="join"
                id="joinin-btn"
                :class="{ 'shake-effect': isShaking }"
                style="width: 100%"
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserJoin",
  components: {},
  data() {
    return {
      user: {
        userName: null,
        userId: null,
        userPwd: null,
        emailId: null,
        emailDomain: null,
        image: null,
      },
      pwdCheck: null,
      domains: [
        { value: null, text: "선택" },
        { value: "ssafy.com", text: "싸피" },
        { value: "gmail.com", text: "구글" },
        { value: "naver.com", text: "네이버" },
        { value: "kakao.com", text: "카카오" },
      ],
      isJoinIdPass: false, // 회원가입 할 수 있는지 확인하는 flag
      isJoinPwdPass: false,
      isShowJoin: false,
      isShaking: false,
      isEmailPass: false, // 이메일 인증
      adminNumber: null, // 인증 번호
      isShowAdmin: false,
      adminResultDiv: false, // 이메일 인증이 성공시 결과 출력화면
    };
  },
  computed: {
    ...mapState(userStore, ["isValidId", "isJoin", "adminKey", "isSendAdminMail"]),
  },
  methods: {
    ...mapActions(userStore, ["idConfirm", "userJoin", "sendUserAdminEmail"]),
    async confirmId() {
      let resultDiv = document.querySelector("#check-id-result");
  
      if (this.user.userId.length < 6 || this.user.userId.length > 16) {
        resultDiv.setAttribute("class", "mb-3 text-danger");
        resultDiv.textContent = "아이디는 6자 이상 16자 이하 입니다.";
        // isValidId = false;
      } else {
        // 아이디가 유효한 아이디인지 확인
        await this.idConfirm(this.user.userId);
        if (this.isValidId) {
          resultDiv.setAttribute("class", "mb-3 text-primary");
          resultDiv.textContent = "사용할 수 있는 아이디 입니다.";
          this.isJoinIdPass = true;
        } else {
          resultDiv.setAttribute("class", "mb-3 text-danger");
          resultDiv.textContent = "사용할 수 없는 아이디 입니다.";
          this.isJoinIdPass = false;
        }
      }
      if (this.user.userId || this.user.userName || this.user.userPwd || !this.isEmailPass) {
        return;
      }
    },
    async join() {
      if (!this.isJoinIdPass || !this.isJoinPwdPass) {
        this.isShowJoin = true;
        this.isShaking = true;

        setTimeout(() => {
          this.isShaking = false;
        }, 1000);
        return;
      }
      this.isShowJoin = false;
      await this.userJoin(this.user);
      if (this.isJoin) {
        console.log(this.isJoin);
        this.$router.push({ name: "main" });
      }
    },
    async confirmPwd() {
      let pwdResultDiv = document.querySelector("#signin-pwdcheck");
      // console.log("userPwd : " + this.user.userPwd + ", pwdCheck: " + this.pwdCheck);
      if (this.user.userPwd === this.pwdCheck) {
        // 비밀번호랑 비밀번호 확인이 같다면
        pwdResultDiv.setAttribute("class", "form-control");
        this.isJoinPwdPass = true;
      } else {
        pwdResultDiv.setAttribute("class", "form-control fail-input");
        this.isJoinPwdPass = false;
      }
    },
    addFocusStyle() {
      const input = document.getElementById("signin-pwdcheck");
      input.classList.add("focus");
    },
    removeFocusStyle() {
      const input = document.getElementById("signin-pwdcheck");
      input.classList.remove("focus");
    },
    userProfile() {
      this.user.image = this.$refs["image"].files[0];
      console.log(this.user.image);
    },
    // 이미지 저장
    clickInputTag() {
      this.$refs["image"].click();
    },
    // 인증 이메일 보내기
    async sendEmail() {
      this.isShowAdmin = true;
      console.log("admin email :: ");
      console.log(this.user.emailId);
      console.log(this.user.emailDomain);
      alert("인증번호가 발송되었습니다.")
      await this.sendUserAdminEmail([this.user.emailId, this.user.emailDomain]); 
      if (this.isSendAdminMail) {
        alert("메일 전송이 완료되었습니다.");
        // console.log("adminCheck :: " + this.adminKey);
      } else {
        console.log("admin mail send :: fail");
      }
    },
    // 인증번호와 맞는지 비교
    adminCheck() {
      if (this.adminNumber && (this.adminNumber === this.adminKey)) {
        alert("인증이 완료되었습니다.");
        this.isEmailPass = true;
        this.adminResultDiv = true;
        this.isShowAdmin = false;
      } else {
        console.log(this.adminKey);
        console.log("admin check :: fail");
      }
    },
  },
};
</script>

<style scoped>
.sign-container {
  display: inline-block;
  width: 430px;
  text-align: left;
  /* border: 1px solid lightgray; */
  border-radius: 1rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
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

.fail-input {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border: 1px solid #ced4da;
  border-color: rgb(204, 6, 6);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
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

.image-content {
  cursor: pointer;
}

.admin:hover {
  cursor: pointer;
}

</style>
