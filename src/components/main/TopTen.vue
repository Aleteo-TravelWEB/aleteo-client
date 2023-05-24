<template>
  <div class="slider">
    <link
      rel="stylesheet"
      href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />

    <button id="prev" class="btn"><b-icon-arrow-left class="arrow"></b-icon-arrow-left></button>
    <div class="card-content">
      <!-- Card start-->
      <div class="card" v-for="place in topPlanPlaces" :key="place.place_id">
        <b-icon-heart-fill class="icon" style="color: #e86154"></b-icon-heart-fill>
        <div class="card-img">
        </div>
        <div class="card-text">
          <h2>{{place.name}}</h2>
          <p>{{place.address}}</p>
        </div>
      </div>
      <!-- Card end -->
    </div>
    <button id="next" class="btn">
      <b-icon-arrow-right class="arrow"></b-icon-arrow-right>
    </button>
  </div>
</template>

<script>
import { viewTopTenPlanPlaces } from "@/api/main"

export default {
  name: "TopTen",
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 4,
      attractions: [],
      topPlanPlaces: [],
    };
  },
  mounted() {
    const next = document.querySelector("#next");
    const prev = document.querySelector("#prev");

    function handleScrollNext() {
      const cards = document.querySelector(".card-content");
      cards.scrollLeft = cards.scrollLeft +=
        window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
    }
    function handleScrollPrev() {
      const cards = document.querySelector(".card-content");
      cards.scrollLeft = cards.scrollLeft -=
        window.innerWidth / 2 > 600 ? window.innerWidth / 2 : window.innerWidth - 100;
    }
    next.addEventListener("click", handleScrollNext);
    prev.addEventListener("click", handleScrollPrev);
  },
  created() {
    ////////////////// top ten 여행 계획에 넣은 관광지 리스트 start //////////////////
    viewTopTenPlanPlaces(
      ({data}) => {
        console.log("data ::");
        console.log(data);
        this.topPlanPlaces = data;
        
      }
      ,(error) => {
        console.log(error);
      }
    ),
    ////////////////// top ten 여행 계획에 넣은 관광지 리스트 end //////////////////
    ////////////////// 관광지에 대한 이미지 리스트 start //////////////////
    http.get
  },
  computed: {
    topPlanPlcesPagination() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.topPlanPlaces.slice(startIndex, endIndex);
    },
  },
  methods: {},
};
</script>

<style scoped>
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
</style>
