<template>
  <b-container>
    <div class="mt-5 mb-4">
      <h3 style="color: black">#Hot #Place</h3>
    </div>
    <div class="buttons mb-5">
      <button
        class="btn-hover color-9 mx-3"
        style="width: 200px"
        variant="outline-prim"
        @click="movetoRegist()"
      >
        등록하러 가기
      </button>
      <button
        class="btn-hover color-9"
        style="width: 200px"
        variant="outline-prim"
        @click="movetoMyHotplace()"
      >
        내 핫플레이스
      </button>
    </div>
    <div class="grid">
      <div class="grid_item" v-for="hotplace in pagination" :key="hotplace.id">
        <div class="card">
          <img class="card_img" :src="`/upload/hotplace/image/${hotplace.image}`" alt="thumnail" />
          <div class="card_content">
            <p class="card_header">{{ hotplace.title }}</p>
            <div style="height: 55px">
              <span class="card_text" v-if="hotplace.tag1 !== `null`">#{{ hotplace.tag1 }}</span>
              <br />
              <span class="card_text" v-if="hotplace.tag2 !== `null`">#{{ hotplace.tag2 }}</span>
            </div>
            <button class="card_btn" @click="showdetail(hotplace)">
              더 보기<span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-pagination
      pills
      v-model="currentPage"
      :total-rows="hotplaces.length"
      :per-page="perPage"
      align="center"
      class="mt-4 mb-5"
    />
    <!-- 모달창 -->

    <b-modal id="deatil" v-model="showDetailModal" hide-footer>
      <template #modal-header>
        <!-- 커스텀 헤더 내용 추가 -->
        <div class="hover-div d-flex flex-end mb-3" @click="closeModal()">
          <b-icon icon="x-circle-fill" style="color: #e86154"></b-icon>
        </div>
        <h5 class="header-title">{{ hotplace.title }}</h5>
      </template>

      <template>
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
          <div class="d-flex justify-content-end mb-3">
            <b-icon
              :class="{ 'heart-effect': isHeart, 'default-effect': true }"
              :icon="isHeart ? 'suit-heart-fill' : 'suit-heart'"
              @click="pushHeart()"
            ></b-icon>
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
          <div class="mb-3">{{ hotplace.description }}</div>
          <a :href="hotplace.mapUrl" target="_blank"
            ><b-icon icon="pin-map"></b-icon><span class="mx-1">지도상에서 확인하기</span></a
          >
        </div>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { listHotplace } from "@/api/hotplace";
import { mapState } from "vuex";
import http from "@/api/http";

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
        num: null,
      },
      showDetailModal: false,
      isHeart: false, // 하트 눌러져있는지 확인
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
      http
        .get(`/hotplace/good/${this.userInfo.userId}/${this.hotplace.num}`, {
          headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
        })
        .then(({ data }) => {
          if (data.message === "success") {
            this.isHeart = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(this.hotplace);
      console.log(this.showDetailModal);
    },
    movetoMyHotplace() {
      this.$router.push({ name: "hotplacemodify" });
    },
    closeModal() {
      this.showDetailModal = false;
      this.isHeart = false;
    },
    //////// 좋아요 start /////////
    pushHeart() {
      if (this.isHeart) {
        this.isHeart = false;
        console.log("좋아요에 제거");
        http
          .delete(`/hotplace/good/${this.userInfo.userId}/${this.hotplace.num}`, {
            headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
          })
          .then(({ data }) => {
            if (data.message === "success") {
              // alert("좋아요 삭제 성공!");
            } else {
              console.log("좋아요 삭제 실패..");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.isHeart = true;
        // console.log("좋아요에 추가");
        // 좋아요에 추가
        const goodHot = {
          userId: this.userInfo.userId,
          hotplaceId: this.hotplace.num,
        };
        http
          .post(`/hotplace/good`, goodHot, {
            headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
          })
          .then(({ data }) => {
            if (data.message === "success") {
              // alert("좋아요 등록!");
            } else {
              // console.log("좋아요 등록 실패ㅜ");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //////// 좋아요 end /////////
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
/* .grid_item {
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
} */

.card_img {
  display: block;
  height: 14rem;
  object-fit: cover;
}
.card_content {
  padding: 2rem 2rem;
}
.card_header {
  font-size: 1.3rem;
  font-weight: 500;
  color: #0d0d0d;
  margin-bottom: 1.5rem;
  height: 3rem;
  align-items: center;
  text-align: center;
}
.card_text {
  font-size: 1rem;
  letter-spacing: 0.1rem;
  line-height: 1.7;
  color: #3d3d3d;
  height: 3rem;
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

/* 이동 버튼 */
.buttons {
  text-align: center;
  margin: 10px;
}

.btn-hover {
  width: 180px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 50px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  margin-left: 10px;

  border-radius: 20px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-9 {
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.hover-div {
  cursor: pointer;
}

/* heart effect  */

@keyframes heart {
  0% {
    transform: scale(1);
  }
  17.5% {
    transform: scale(0.5);
  }
}

.default-effect {
  cursor: pointer;
}

.heart-effect {
  cursor: pointer;
  will-change: transform;
  transform-origin: 50% 50%;
  animation: heart 0.5s;
  color: crimson;
}
</style>
