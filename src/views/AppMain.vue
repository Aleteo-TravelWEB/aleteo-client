<template>
  <div class="background"></div>
</template>

<script>
export default {
  name: "AppMain",
  components: {},
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
