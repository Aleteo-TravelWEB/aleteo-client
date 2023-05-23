<template>
  <div style="width: 100px; height: 40px; color: black;">
    <!-- <div v-for="(attraction, index) in attractions" :key="index">
      {{attraction.title}}
    </div> -->
  </div>
</template>

<script>
// import { listAttraction } from "@/api/main.js";

export default {
  name: 'MainAttractionList',
  components: {},
  data() {
    return {
      attractions: [],
    };
  },
  created() {
    // listAttraction(({data}) => {
    //   this.attractions = data;
    //   console.log("attraction data ::");
    //   console.log(data);
    // }) 
  },
  methods: {},
};
</script>

<style scoped></style>