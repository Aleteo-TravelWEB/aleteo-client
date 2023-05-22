<template>
  <b-container>
    <div>핫플레이스 어쩌고 저쩌구</div>
    <button @click="movetoRegist" id="registbutton" class="styled-button">등록하러 가기</button>
    <button @click="movetoMyHotplace" id="registbutton" class="styled-button">
      나만의 핫플레이스
    </button>
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
          <b-button @click="showdetail(hotplace)" variant="primary">더 보기</b-button>
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
    <!-- 모달창 -->
    <b-modal id="deatil" v-model="showDetailModal" :title="this.hotplace.title">
      <span class="close">&times;</span>
      <div style="display: flex; justify-content: center; align-items: center;">
        <img :src="`/upload/hotplace/image/${hotplace.image}`" alt="" width="400px" height="500px" style="object-fit: contain;" />
      </div>
      <hr />
      <h4>#{{ hotplace.tag1 }} #{{ hotplace.tag2 }}</h4>
      <hr />
      <div>{{ hotplace.description }}</div>
      <a :href="hotplace.mapUrl" target="_blank">지도상에서 확인하기</a>
    </b-modal>

    <!-- 모달창  -->
    <!-- <div class="modal" v-if="showDetailModal"> -->
      <!-- 모달 헤더 -->
      <!-- <div class="modal-header modal-header-custom">
        <h4>{{ this.hotplace.title }}</h4>
        <button type="button" class="close" @click="closeModal">&times;</button>
      </div> -->
      <!-- 모달 본문 -->
      <!-- <div class="modal-body">
        <img :src="`/upload/hotplace/image/${hotplace.image}`"/>
        <hr />
        <span>#{{ hotplace.tag1 }}</span>
        <span>#{{ hotplace.tag2 }}</span>
        <hr />
      </div>
    </div> -->
    <!-- 모달창 끝 -->
  </b-container>
</template>

<script>
import { listHotplace } from "@/api/hotplace";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "HotplaceList",
  components: {},
  data() {
    return {
      hotplaces: [],
      currentPage: 1,
      perPage: 9,
      hotplace: {
        userId: null,
        image: null,
        title: null,
        description: null,
        tag1: null,
        tag2: null,
        latitude: null, // 위도 => y
        longitude: null, // 경도 => x
        mapUrl: null,
        imageUrl: null,
      },
      showDetailModal: false,
    };
  },
  created() {
    listHotplace(
      ({ data }) => {
        this.hotplaces = data;
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
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
    showdetail(hotplace) {
      this.hotplace = hotplace;
      this.showDetailModal = true;
      console.log(hotplace);
      console.log(this.showDetailModal);
    },
    movetoMyHotplace() {
      this.$router.push({ name: "hotplacemodify" });
    },
    closeModal() {
      this.showDetailModal = false;
    },
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
