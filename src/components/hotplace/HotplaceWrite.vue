<template>
  <b-container>
    <div class="col-12 col-md-8 container">
      <input id="search-bar" v-model="search.keyword" @keyup.enter="searchPlaces" />
      <button class="fas fa-search btn" id="search-btn" @click="searchPlaces">검색</button>
    </div>

    <button @click="movetolist">핫플레이스 목록 바로가기</button>
    <!-- 지도 출력 영역 -->
    <!-- <div id="map" style="width: 80%; height: 400px"></div> -->
    <div id="map" style="height: 400px" class="shadow rounded"></div>
    <!-- 지도 출력 완료 -->

    <!-- <div id="menu_wrap" class="bg_white"></div> -->
    <hr />
    <article>
      <dl>
        <div
          v-for="result in search.results"
          :key="result.id"
          @click="openModal(result)"
          class="toregistbtn"
        >
          <dt @click="moveMap(result)">{{ result.place_name }}</dt>
          <dd>{{ result.address_name }}</dd>
        </div>
      </dl>
    </article>
    <div>페이지</div>
    <div id="pagination" class="page"></div>

    <!-- 등록 모달창 -->
    <!-- 모달 창 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>핫플레이스 등록하기</h2>
        <p>모달 내용을 여기에 작성하세요.</p>
        내용 :<input
          type="text"
          placeholder="이 장소에 대해 설명해주세요~~"
          v-model="hotplace.description"
          class="modal-input"
          id="description"
        />
        태그 1:<input type="text" placeholder="태그1" v-model="hotplace.tag1" class="modal-input" />
        태그 2:<input type="text" placeholder="태그2" v-model="hotplace.tag2" class="modal-input" />
        사진 : <input type="file" @change="hotplaceimg" />
        <button type="button" @click="write" class="search-button">등록</button>
        <button type="button" @click="closeModal" class="search-button">취소</button>
      </div>
    </div>
  </b-container>
</template>

<script>
import { writeHotplace } from "@/api/hotplace";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "HotplaceWrite",
  components: {},
  data() {
    return {
      mapOptions: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 3,
      },
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
        imageUrl: "",
      },
      markers: [], // 마커 담을 객체 배열
      search: {
        keyword: null,
        results: [],
        pagination: null,
      },
      showModal: false,
      img: null,
      imagechanged: false,
      imageUrl: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {},
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=35bf0781b897371e460ad083e4cacf49&libraries=services";
      script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행할 준비가 되어 있으면 지도 실행

      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");

      this.map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(
          this.mapOptions.center.lat,
          this.mapOptions.center.lng
        ),
        level: 3,
      });
    },
    searchPlaces() {
      const keyword = this.search.keyword;

      if (keyword === null || keyword.length === 0) {
        // 검색창 흔들리는 것으로 바꾸고 싶당.
        alert("검색어를 입력하세요!");
        return;
      }
      const ps = new window.kakao.maps.services.Places();

      // 장소 검색
      ps.keywordSearch(keyword, (data, status, pagination) => {
        this.search.keyword = keyword;
        this.search.pagination = pagination;
        this.search.results = data;
        console.log(data);

        console.log(status);

        if (status === window.kakao.maps.services.Status.OK) {
          this.displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 없습니다.");
          return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      });
    },
    displayPagination(pagination) {
      const paginationEl = document.getElementById("pagination");
      const fragment = document.createDocumentFragment();

      if (!paginationEl) return;

      console.log(pagination);

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (let i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        el.style.marginRight = "5px";

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    },
    moveMap(place) {
      const center = new window.kakao.maps.LatLng(place.y, place.x);
      this.map.setCenter(center);
    },
    openModal(place) {
      this.showModal = true;
      this.hotplace.title = place.place_name;
      this.hotplace.latitude = place.y;
      this.hotplace.longitude = place.x;
      this.hotplace.mapUrl = place.place_url;
      this.hotplace.userId = this.userInfo.userId;
      console.log(this.hotplace);
    },
    write() {
      console.log("실행됨");
      console.log(this.hotplace);
      if (!this.hotplace.description) {
        alert("내용을 입력해주세요");
      } else if (!this.imagechanged) {
        alert("사진을 등록해주세요");
      } else {
        this.sendHotplace(this.hotplace, this.img, this.imageUrl);
      }
    },
    closeModal() {
      this.showModal = false;
      this.imagechanged = false;
      this.hotplace.description = null;
      this.hotplace.tag1 = null;
      this.hotplace.tag2 = null;
    },
    hotplaceimg(event) {
      this.img = event.target.files[0];
      this.imagechanged = true;
      if (this.img) {
        this.fileToBlob(this.img)
          .then((blob) => {
            console.log(blob);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    sendHotplace(param, img, imageurl) {
      console.log(imageurl);
      writeHotplace(
        [param, img, imageurl],
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생 했습니다.";
          console.log(data);
          if (data.message === "success") {
            msg = "등록 완료";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
      this.closeModal();
    },
    fileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          return blob;
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    movetolist() {
      this.$router.push({ name: "hotplacelist" });
    },
  },
};
</script>

<style scoped>
.search-button {
  border: 1px solid;
  border-radius: 3px;
  margin-right: 10px;
}
.result-text {
  border: 1px solid;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  font-size: 30px;
  margin: 20px;
  /* Add margin to create spacing */
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}
.modal-input {
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 목록 리스트 css */
.toregistbtn {
  cursor: pointer;
}
* {
  box-sizing: border-box;
}

body {
  font-family: "Open Sans", sans-serif;
  margin: 0 auto;
  padding: 1rem;
}

article {
  max-width: 70rem;
  margin: 0 auto;
  border: 0.18rem solid lightgrey;
  padding: clamp(1rem, 2vw, 3rem);
  border-radius: 0.5rem;
}

h1,
dl {
  margin: 0;
}

article > * + * {
  margin-top: 1rem;
}

dl {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 1rem;
}

dl > div {
  background: antiquewhite;
  padding: 1rem;
}

dl > div:nth-child(4n - 2) {
  background: lavenderblush;
}

dl > div:nth-child(4n - 1) {
  background: azure;
}

dl > div:nth-child(4n) {
  background: lavender;
}

dt {
  font-weight: 700;
  font-size: 1.3rem;
}

dd {
  margin: 0;
}

/* 검색창 css */
#search-bar {
  height: 40px;
  border-radius: 40px;
  border: 0.5px solid lightgrey;
  width: 100%;
  padding-right: 40px;
  padding-left: 10px;
}
#search-btn {
  height: 40px;
  background-color: #3f72af;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  color: #f9f7f7;
  font-size: 1rem;
  position: absolute;
  right: 15px;
  border-left: 0.5px solid lightgrey;
}
</style>
