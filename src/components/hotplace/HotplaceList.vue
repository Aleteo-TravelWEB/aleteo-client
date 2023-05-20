<template>
  <b-container>
    <div>핫플레이스 어쩌고 저쩌구</div>
    <button @click="movetoRegist" id="registbutton" class="styled-button">등록하러 가기</button>
    <b-row>
      <b-col cols="4" v-for="hotplace in pagination" :key="hotplace.id">
        <b-card
          :title="hotplace.title"
          img-alt="Image"
          img-top
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text> #{{ hotplace.tag1 }} #{{ hotplace.tag2 }} </b-card-text>
          <b-button href="#" variant="primary">더 보기</b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="hotplaces.length"
      :per-page="perPage"
      align="center"
      class="mt-4"
    />
  </b-container>
</template>

<script>
import { listHotplace } from "@/api/hotplace";

export default {
  name: "HotplaceList",
  components: {},
  data() {
    return {
      hotplaces: [],
      currentPage: 1,
      perPage: 9,
    };
  },
  created() {
    listHotplace(
      ({ data }) => {
        this.hotplaces = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    pagination() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.hotplaces.slice(startIndex, endIndex);
    },
  },
  methods: {
    movetoRegist() {
      console.log("핫플 등록하러 가자");
      this.$router.push({
        name: "hotplacewrite",
      });
    },
  },
  convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },
  makerealUrl(imageFile) {
    console.log(this.convertImageToBase64(imageFile));
  },
};
</script>

<style scoped>
.styled-button {
  background-color: #4caf50;
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
