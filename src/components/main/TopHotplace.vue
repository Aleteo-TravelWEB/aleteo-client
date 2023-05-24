<template>
  <div>
    <img :src=images />
  </div>
</template>

<script>
import { viewPlaceImg } from "@/api/main"

export default {
  name: 'TopHotplace',
  components: {},
  data() {
    return {
      images: null,
    };
  },
  created() {
    const keyword = "삼성전자 광주";
    viewPlaceImg(
      keyword,
      ({data}) => {
        console.log("image data :: ");
        // console.log(data.documents[0].image_url);
        this.images = data.documents[0].image_url;
        console.log(this.images);
      }
    )
  },
  methods: {},
};
</script>

<style scoped></style>