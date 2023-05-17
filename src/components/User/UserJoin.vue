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
            <h2>회원가입</h2>
          </div>
          <hr />
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input
                type="text"
                v-model="userName"
                class="form-control"
                name="userName"
                id="signin-name"
                placeholder="이름"
              />
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input
                type="text"
                v-model="userId"
                class="form-control"
                name="userId"
                id="joinin-id"
                placeholder="아이디"
              />
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
                <div id="check-id-result"></div>
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input
                type="password"
                v-model="userPwd"
                class="form-control"
                name="userPwd"
                id="signin-password"
                placeholder="비밀번호"
              />
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input
                type="password"
                v-model="pwdcheck"
                class="form-control"
                name="pwdcheck"
                id="signin-pwdcheck"
                placeholder="비밀번호 확인"
              />
            </div>
          </div>
          <div class="d-flex row justify-content-center mt-4 mb-3">
            <div class="col-10 d-flex">
              <input
                type="text"
                v-model="emailId"
                class="form-control col-5"
                name="emailId"
                id="signin-emailId"
                placeholder="이메일아이디"
              />
              <span class="col-2 d-flex justify-content-center align-items-center">@</span>
              <select
                class="form-select col-5 border rounded"
                id="emailDomain"
                name="emailDomain"
                aria-label="이메일 도메인 선택"
              >
                <option selected>선택</option>
                <option value="ssafy.com">싸피</option>
                <option value="google.com">구글</option>
                <option value="naver.com">네이버</option>
                <option value="kakao.com">카카오</option>
              </select>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <button
                type="button"
                @click="join"
                id="joinin-btn"
                class="btn submit-btn"
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
export default {
  name: 'UserJoin',
  components: {},
  data() {
    return {
      message: '',
      userId: "",
      userPwd: "",
      pwdcheck: "",
    };
  },
  created() {},
  methods: {},
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