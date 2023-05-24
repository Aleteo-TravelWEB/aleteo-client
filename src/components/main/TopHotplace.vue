<template>
  <div>
    <!-- <img :src=images /> -->
  </div>
</template>

<script>
import { viewPlaceImg } from "@/api/main";
import { getTopTenHotplace } from "@/api/hotplace";

export default {
  name: "TopHotplace",
  components: {},
  data() {
    return {
      images: null,
    };
  },
  created() {
    const keyword = "삼성전자 광주";
    viewPlaceImg(keyword, ({ data }) => {
      console.log("image data :: ");
      // console.log(data.documents[0].image_url);
      this.images = data.documents[0].image_url;
      console.log(this.images);
    });
    getTopTenHotplace(({ data }) => {
      if (data.length > 0) {
        console.log("핫플 탑텐 성공");
        console.log(data);
      } else {
        console.log("핫플 탑텐 실패");
      }
    });
  },
  methods: {},
};
</script>

<style scoped></style>
