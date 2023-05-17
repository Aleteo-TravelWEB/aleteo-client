<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="custom-color4" class="navbar">
      <b-navbar-brand href="/">
        <img src="@/assets/logo.png" class="d-inline-block align-center" alt="logo" />
        Aleto
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/plan">여행계획</b-nav-item>
          <b-nav-item href="/hotplace">핫플레이스</b-nav-item>
          <b-nav-item href="/notice">공지사항</b-nav-item>
          <b-nav-item href="/board">게시판</b-nav-item>
          <b-nav-item href="/qna">Q&A</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
              <b-icon icon="person"></b-icon>
            </template>
            <b-dropdown-item href="#">로그인</b-dropdown-item>
            <b-dropdown-item href="#">회원가입</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TheHeaderNaviBar",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
