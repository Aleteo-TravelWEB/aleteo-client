<template>
  <div id="app">
    <the-header-navi-bar></the-header-navi-bar>
    <the-footer-vue></the-footer-vue>
  </div>
</template>

<script>
import TheFooterVue from "./components/common/TheFooter.vue";
import TheHeaderNaviBar from "./components/common/TheHeaderNaviBar.vue";

export default {
  name: "App",
  components: {
    TheHeaderNaviBar,
    TheFooterVue,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
@font-face {
    font-family: 'neon';
    src:  url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
}

* {
  font-family: 'neon';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  /* color: #42b983; */
  color: #808b9d;
}
</style>
