<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="custom-color4" class="navbar shadow">
      <b-navbar-brand href="/">
        <img src="@/assets/ALETEO.png" class="d-inline-block align-center logo" alt="logo" />
        Aleteo
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/attraction">관광지</b-nav-item>
          <b-nav-item href="/plan">나만의플랜</b-nav-item>
          <b-nav-item href="/hotplace">핫플레이스</b-nav-item>
          <b-nav-item href="/notice">공지사항</b-nav-item>
          <b-nav-item href="/board">여행해듀오</b-nav-item>
        </b-navbar-nav>
        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            
            <router-link :to="{ name: 'mypage' }" class="link align-self-center">
            <b-avatar variant="light"></b-avatar> {{ userInfo.userName }}님 환영합니다.
            </router-link>
          </b-nav-item>
          <b-nav-item class="align-self-center link" @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
              <b-icon icon="person"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <div @click="moveLogin()"><b-icon icon="key"></b-icon> 로그인</div>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <div @click="moveJoin()"><b-icon icon="patch-plus-fill"></b-icon> 회원가입</div>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "TheHeaderNaviBar",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    onClickLogout() {
      // console.log(this.userInfo.userId);
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); // 저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token");
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
    moveLogin() {
      if (this.$route.path != "/user/login") this.$router.push({ name: "login" });
    },
    moveJoin() {
      if (this.$route.path != "/user/join") this.$router.push({ name: "join" });
    },
  },
  created() {},
};
</script>

<style scoped>
.link {
  color: #808b9d;
  text-decoration: none;
}

.link:hover {
  color: #bec3cc;
}

.logo {
  width: 40px;
}
</style>
