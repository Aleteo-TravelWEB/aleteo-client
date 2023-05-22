<template>
  <b-container>
    <div>
      <button @click="movetoRegist" id="registbutton" class="styled-button">등록하러 가기</button>
      <button @click="movetoMyHotplace" id="registbutton" class="styled-button">
        나만의 핫플레이스
      </button>
    </div>
    <div class="grid">
      <div class="grid_item" v-for="hotplace in pagination" :key="hotplace.id">
        <div class="card">
          <img class="card_img" :src="`/upload/hotplace/image/${hotplace.image}`" alt="thumnail" />
          <div class="card_content">
            <h4 class="card_header">{{ hotplace.title }}</h4>
            <span class="card_text" v-if="hotplace.tag1 !== `null`">#{{ hotplace.tag1 }}</span>
            <span class="card_text" v-if="hotplace.tag2 !== `null`">#{{ hotplace.tag2 }}</span>
            <button class="card_btn" @click="showdetail(hotplace)">
              더 보기<span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="hotplaces.length"
      :per-page="perPage"
      align="center"
      class="mt-4"
    />
    <!-- 모달창 -->

    <b-modal id="deatil" v-model="showDetailModal">
      <template #modal-header>
        <!-- 커스텀 헤더 내용 추가 -->
        <b-button size="sm" variant="outline-danger" @click="close()">close</b-button>
        <h5 class="header-title">{{ hotplace.title }}</h5>
      </template>

      <template #default>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            :src="`/upload/hotplace/image/${hotplace.image}`"
            width="400px"
            alt=""
            style="object-fit: contain"
          />
          <hr style="width: 100%; border: none; border-top: 1px solid lightgray" />
          <div class="d-flex justify-content-end">
            <b-icon icon="heart"></b-icon>
          </div>
          <div style="display: flex">
            <div v-if="hotplace.tag1 !== `null`" style="margin-right: 10px">
              #{{ hotplace.tag1 }}
            </div>
            <div v-if="hotplace.tag2 !== `null`" style="margin-right: 10px">
              #{{ hotplace.tag2 }}
            </div>
          </div>
          <div>작성자 : {{ hotplace.userId }}</div>
          <hr style="width: 100%; border: none; border-top: 1px solid lightgray" />
          <div>{{ hotplace.description }}</div>
          <a :href="hotplace.mapUrl" target="_blank">지도상에서 확인하기</a>
        </div>
      </template>
    </b-modal>
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
      console.log(this.hotplace);
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
.grid_item {
  background-color: #fff;
  height: 30rem;
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s;
}

.grid_item:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
}

.card_img {
  display: block;
  height: 14rem;
  object-fit: cover;
}
.card_content {
  padding: 3rem 3rem;
}
.card_header {
  font-size: 2rem;
  font-weight: 500;
  color: #0d0d0d;
  margin-bottom: 1.5rem;
  height: 3rem;
  align-items: center;
  text-align: center;
}
.card_text {
  font-size: 1.25em;
  letter-spacing: 0.1rem;
  line-height: 1.7;
  color: #3d3d3d;
  margin-bottom: 2.5rem;
}
.card_btn {
  display: block;
  width: 100%;
  padding: 1.5rem;
  font-size: 1rem;
  text-align: center;
  color: #3363ff;
  background-color: #e6ecff;
  border: none;
  border-radius: 0.4rem;
  transition: 0.2s;
  cursor: pointer;
}
.card_btn span {
  margin-left: 1rem;
  transition: 0.2s;
}
.card_btn:hover,
.card__btn:active {
  background-color: #dce4ff;
}
.card_btn:hover span,
.card__btn:active span {
  margin-left: 1.5rem;
}
</style>
