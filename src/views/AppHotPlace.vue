<template>
  <div>
    <h3>Hot place</h3>
    <hotplace-list></hotplace-list>
  </div>
</template>

<script>
import HotplaceList from "@/components/hotplace/HotplaceList.vue";

export default {
  name: "AppHotplace",
  components: {HotplaceList},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
