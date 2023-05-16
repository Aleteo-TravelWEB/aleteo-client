<template>
  <div class="background">
    <attraction-search-bar></attraction-search-bar>
  </div>
</template>

<script>
import AttractionSearchBar from "@/components/main/AttractionSearchBar.vue";

export default {
  name: "AppMain",
  components: {
    AttractionSearchBar,
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
  background-image: url("@/assets/img/background4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
