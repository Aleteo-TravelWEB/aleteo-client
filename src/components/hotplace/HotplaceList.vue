<template>
  <b-container>
    <div>핫플레이스 어쩌고 저쩌구</div>
    <button @click="movetoRegist" id="registbutton" class="styled-button">등록하러 가기</button>
  </b-container>
</template>

<script>
import { listHotplace } from "@/api/hotplace";


export default {
  name: 'HotplaceList',
  components: {
  },
  data() {
    return {
      hotpalces: [],
      currentPage: 1,
      perPage: 9,
    };
  },
  created() {
    listHotplace(
      ({ data }) => {
        this.hotpalces = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  },
  methods: {
    movetoRegist() {
      console.log("핫플 등록하러 가자");
      this.$router.push({
        name: "hotplacewrite",
      });
    }
  },
};
</script>

<style scoped>
.styled-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>