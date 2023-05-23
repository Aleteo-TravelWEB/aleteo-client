<template>
  <div class="background">
    <div class="title d-flex flex-row justify-content-center" style="width: 100%">
      <h1 class="title-content">ALETEO</h1>
    </div>
    <div class="d-flex flex-row justify-content-center mb-2 search" style="width: 100%">
      <div class="today mx-3 p-2 shadow px-5" @click="moveAttraction()">
        오늘의 관광지는? <b-icon class="px-3" icon="search" animation="fade" />
      </div>
    </div>

    <div class="content">
      <div>
        <main-attraction-list></main-attraction-list>
      </div>
    </div>
  </div>
</template>

<script>
import MainAttractionList from "@/components/main/MainAttractionList.vue";

export default {
  name: "AppMain",
  components: {
    MainAttractionList,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {
    moveAttraction() {
      this.$router.push({ name: "attraction" });
    },
  },
};
</script>

<style scoped>
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-image: url("@/assets/img/background4.jpg");
}

.title {
  position: absolute;
  top: 200px;
}

.title-content {
  font-size: 60px;
  color: black;
}

.search {
  position: absolute;
  top: 300px;
}

.today {
  background: #ffffff2b;
  width: 300px;
  border: 2px solid #c1c1c1;
  border-radius: 10px;
}

.today:hover {
  cursor: pointer;
  border: 4px solid #c1c1c1;
  box-shadow: 2px 3px 10px 0px;
}

.content {
  background: #ffffff;
  width: 100%;
  top: 557px;
  position: absolute;
}
</style>
