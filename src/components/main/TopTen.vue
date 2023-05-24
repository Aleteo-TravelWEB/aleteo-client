<template>
  <div>
    <div class="mt-3">
      <h3>인기 여행지 TOP 10</h3>
    </div>
    <swiper class="swiper p-5" :options="swiperOption">
      <swiper-slide v-for="(place, index) in topPlanPlaces" :key="index">
        <b-icon-heart-fill class="icon" style="color: #e86154"></b-icon-heart-fill>
        <div>
          <div class="card-img">
            <img :src="place.imageUrl" :alt="place.placeId" />
          </div>
          <div class="card-text d-flex flex-column">
            <h2>{{ place.name }}</h2>
            <p>{{ place.address }}</p>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <div class="mt-3">
      <h3>핫플 TOP 10</h3>
    </div>
    <swiper class="swiper p-5" :options="swiperOption">
      <swiper-slide v-for="(place, index) in topHotplaces" :key="index">
        <b-icon-heart-fill class="icon" style="color: #e86154"></b-icon-heart-fill>
        <div>
          <div class="card-img">
            <img :src="place.imageUrl" :alt="place.placeId" />
          </div>
          <div class="card-text d-flex flex-column">
            <h2>{{ place.name }}</h2>
            <p>{{ place.address }}</p>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { viewTopTenPlanPlaces } from "@/api/main";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "TopTen",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      totalPages: 3,
      currentPage: 1,
      perPage: 4,
      attractions: [],
      topPlanPlaces: [],
      topHotplaces: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  mounted() {},
  created() {
    ////////////////// top ten 여행 계획에 넣은 관광지 리스트 start //////////////////
    viewTopTenPlanPlaces(
      ({ data }) => {
        console.log("data ::");
        console.log(data);
        this.topPlanPlaces = data;
      },
      (error) => {
        console.log(error);
      }
    );
    ////////////////// top ten 여행 계획에 넣은 관광지 리스트 end //////////////////
    ////////////////// 관광지에 대한 이미지 리스트 start //////////////////

    ////////////////// top 핫플레이스에 넣은 관광지 리스트 start //////////////////
  },
  computed: {},
  methods: {},
};
</script>

<style>
.slide {
  height: 500px;
}
/* 슬라이드 */
body {
  font-family: Inter;
}

.card {
  width: 300px;
  height: auto;
  background: #fff;
  border-radius: 30px;
  position: relative;
  z-index: 10;
  margin: 25px;
  min-height: 330px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.08);
}

.card:hover {
  transform: translate(0, -10px);
  box-shadow: 0px 17px 35px 0px rgba(0, 0, 0, 0.07);
}

.card .icon {
  position: absolute;
  right: 11;
  top: -4;
  padding: 15px;
  font-size: 1rem;
  line-height: 3.2rem;
}
.card .card-text {
  padding: 20px;
}

p {
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: 10px;
}

.card .card-img {
  transform: translate(90px, -10px);
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s ease-out;
}

.card img {
  height: 180px;
}
.card img.blur {
  position: absolute;
  filter: blur(15px);
  z-index: -1;
  opacity: 0.4;
  transform: translate(-160px, 30px);
  transition: all 0.35s ease-out;
}
.card:hover .card-img {
  transform: translate(70px, -15px);
}

.card:hover .card-img img.blur {
  transform: translate(-100px, 35px) scale(0.85);
  opacity: 0.25;
  filter: blur(20px);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: auto;
  padding-left: 60px;
  padding-right: 50px;
  scroll-behavior: smooth;
}

.card-content::-webkit-scrollbar {
  height: 0px;
}

.card-content:after {
  content: "";
  display: block;
  min-width: 20px;
  height: 100px;
  position: relative;
}

.btn {
  min-width: 60px;
  margin: auto 30px;
  height: 60px;
  border-radius: 20px;
  background: #fff;
  border: 0px;
  outline: none;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
}

.btn:hover {
  box-shadow: 0px 17px 35px 0px rgba(0, 0, 0, 0.07);
}

.btn .arrow {
  font-size: 1.2rem;
}

.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(242, 243, 248);
  width: 100%;
  height: 40vh;
  overflow: hidden;
}

.slider:after {
  content: "";
  left: 98px;
  height: 90vh;
  position: absolute;
  width: 150px;
  z-index: 100;
  background: linear-gradient(90deg, rgb(242, 243, 248) 0%, rgba(242, 243, 248, 0) 100%);
}

.slider:before {
  content: "";
  right: 98px;
  height: 90vh;
  position: absolute;
  width: 150px;
  z-index: 100;
  background: linear-gradient(90deg, rgba(242, 243, 248, 0) 0%, rgba(242, 243, 248, 1) 100%);
}
</style>
