<template>
  <div class="background">
    메인 페이지
    <search-bar></search-bar>
    <div>지도</div>
  </div>
</template>

<script>
import SearchBar from "@/components/main/SearchBar.vue";

export default {
  name: "AppMain",
  components: {
    SearchBar,
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

<style scoped>
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
