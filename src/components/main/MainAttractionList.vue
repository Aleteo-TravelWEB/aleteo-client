<template>
  <!-- <div style="width: 100px; height: 40px; color: black"></div> -->
  <div>
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css" />
    <div class="slide-container swiper">
      <div class="slide-content">
        <div class="card-wrapper swiper-wrapper">
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
          <!-- -- -->
          <div class="card swiper-slide">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <!-- 이미지 넣어 여기다 -->
                이미지
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">이름</h2>
              <p class="description">설명</p>
              <button class="button">버튼</button>
            </div>
          </div>
          <!-- -- -->
        </div>
      </div>
      <div class="swiper-button-next swiper-navBtn"></div>
      <div class="swiper-button-prev swiper-navBtn"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "MainAttractionList",
  components: {},
  data() {
    return {
      attractions: [],
    };
  },
  mounted() {
    new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      centerSlide: true,
      fade: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
/* Google Fonts - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.template {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
}
.slide-container {
  max-width: 800px;
  width: 80%;
  padding: 10px 0;
}
.slide-content {
  margin: 0 40px;
  overflow: hidden;
  border-radius: 25px;
}
.card {
  border-radius: 25px;
  background-color: #fff;
}
.image-content,
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
}
.image-content {
  position: relative;
  row-gap: 5px;
  padding: 25px 0;
}
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #4070f4;
  border-radius: 25px 25px 0 25px;
}
.overlay::before,
.overlay::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -40px;
  height: 40px;
  width: 40px;
  background-color: #4070f4;
}
.overlay::after {
  border-radius: 0 25px 0 0;
  background-color: #fff;
}
.card-image {
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: #fff;
  padding: 3px;
}
.card-image .card-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #4070f4;
}
.name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
.description {
  font-size: 14px;
  color: #707070;
  text-align: center;
}
.button {
  border: none;
  font-size: 16px;
  color: #fff;
  padding: 8px 16px;
  background-color: #4070f4;
  border-radius: 6px;
  margin: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.button:hover {
  background: #265df2;
}
.swiper-navBtn {
  color: #6e93f7;
  transition: color 0.3s ease;
}
.swiper-navBtn:hover {
  color: #4070f4;
}
.swiper-navBtn::before,
.swiper-navBtn::after {
  font-size: 35px;
}
.swiper-button-next {
  right: 0;
}
.swiper-button-prev {
  left: 0;
}
.swiper-pagination-bullet {
  background-color: #6e93f7;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: #4070f4;
}
@media screen and (max-width: 768px) {
  .slide-content {
    margin: 0 10px;
  }
  .swiper-navBtn {
    display: none;
  }
}
</style>
