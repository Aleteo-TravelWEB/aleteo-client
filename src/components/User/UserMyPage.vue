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
              <b-col cols="3" align-self="end"><strong>아이디</strong></b-col>
              <b-col cols="7" align-self="start">{{
                userInfo.userId }}</b-col>
            </b-row>
            <b-row class="row-margin">
              <b-col cols="3" align-self="end"><strong>이름</strong></b-col>
              <b-col cols="7" align-self="start">{{
                userInfo.userName }}</b-col>
            </b-row>
            <b-row class="row-margin">
              <b-col cols="3" align-self="end"><strong>이메일</strong></b-col>
              <b-col cols="7" align-self="start">{{ userInfo.emailId
              }}@{{ userInfo.emailDomain }}</b-col>
            </b-row>
            <!-- <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col><b-col cols="4" align-self="start">{{
                userInfo.joindate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row> -->
          </b-container>
          <hr class="my-4" />

          <b-button variant="outline-primary" href="#" class="mr-1">
            <router-link :to="{name: 'modify'}" class="link">내정보수정</router-link>
          </b-button>
          <b-button variant="outline-danger" href="#" @click="resignUser">
            탈퇴하기
          </b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo", "isResign"]),
  },
  methods: {
    ...mapActions(userStore, ["userResign"]),
    async resignUser() {
      if(confirm("정말 탈퇴하시겠습니까?")) {
        await this.userResign(this.userInfo.userId);
        sessionStorage.removeItem("access-token"); // 저장된 토큰 없애기
        sessionStorage.removeItem("refresh-token");
        if (this.$route.path != "/") this.$router.push({ name: "main" });
      }
    }
  }
}
</script>

<style scoped>
.link {
  color:black;
  text-decoration: none;
}

.header {
  font-size: xx-large;
}

.row-margin{
  margin: 10px;
}
</style>