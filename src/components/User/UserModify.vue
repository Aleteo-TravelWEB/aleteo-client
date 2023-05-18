<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron bg-variant="Secondary">
          <template><div class="header">My Page</div></template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row class="row-margin">
              <b-col cols="3" align-self="center"><strong>아이디</strong></b-col>
              <b-col cols="7" align-self="center">
                {{userInfo.userId}}</b-col>
            </b-row>
            <b-row class="row-margin">
              <b-col cols="3" align-self="center"><strong>이름</strong></b-col>
              <b-col cols="7" align-self="center">{{
                userInfo.userName }}</b-col>
            </b-row>
            <b-row class="row-margin d-flex">
              <b-col cols="3" align-self="center"><strong>이메일</strong></b-col>
              <b-col cols="7" align-self="center">
                <div class="d-flex">
                  <input
                    type="text"
                    v-model="user.emailId"
                    class="form-control col-6"
                    name="emailId"
                    id="modify-email-id"
                    :placeholder="userInfo.emailId"
                  />
                  <span class="col-2 d-flex justify-content-center align-items-center">@</span>
                  
                  <b-form-select v-model="user.emailDomain" :options="domains"></b-form-select>
                </div>
                </b-col>
            </b-row>
            <b-row class="row-margin d-flex">
              <b-col cols="3"></b-col>
              <b-col cols="7">
                <div id="check-email-id-result"></div>
              </b-col>
            </b-row>
            <!-- <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col><b-col cols="4" align-self="start">{{
                userInfo.joindate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row> -->
          </b-container>
          <hr class="my-4" />

          <b-button variant="outline-secondary" href="#" class="mr-1" @click="modifyUser">
            수정하기
          </b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const userStore = "userStore";

export default {
  name: 'UserModify',
  components: {},
  data() {
    return {
      user: {
        userName: null,
        userId: null,
        userPwd: null,
        emailId: null,
        emailDomain: null,
      },
      domains: [
        {value: null, text: "선택"},
        {value: "ssafy.com", text: "싸피"},
        {value: "google.com", text: "구글"},
        {value: "naver.com", text: "네이버"},
        {value: "kakao.com", text: "카카오"},
      ]
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo", "isModify"]),
  },
  created() {},
  methods: {
    ...mapActions(userStore, ["userModify"]),

    async modifyUser() {
      this.user.userName = this.userInfo.userName;
      this.user.userId = this.userInfo.userId;
      this.user.userPwd = this.userInfo.userPwd;

      if (this.user.emailId === null || this.user.emailDomain === null ) {
        let resultDiv = document.querySelector("#check-email-id-result");
        resultDiv.setAttribute("class", "mb-3 text-danger");
        resultDiv.textContent = "이메일을 입력해주세요";
        return;
      }

      await this.userModify(this.user);
      if (this.isModify) {
        console.log("modify :: " + this.isModify);
        this.$router.push({ name: "mypage" });
      }
    },
  },
};
</script>

<style scoped>

.header {
  font-size: xx-large;
}

.link {
  color: black;
  text-decoration: none;
}

.row-margin{
  margin: 10px;
}

</style>