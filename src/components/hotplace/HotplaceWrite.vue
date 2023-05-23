<template>
  <b-container>
    <div class="buttons mt-3 mb-4">
      <button
        class="btn-hover color-9"
        style="width: 150px"
        variant="outline-prim"
        @click="movetolist()"
      >
        핫플레이스 목록
      </button>
      <button
        class="btn-hover color-9"
        style="width: 150px"
        variant="outline-prim"
        @click="movetoMyHotplace()"
      >
        내 핫플레이스
      </button>
    </div>
    <div class="col-12 col-md-8 container">
      <input id="search-bar" v-model="search.keyword" @keyup.enter="searchPlaces" />
      <button class="fas fa-search btn" id="search-btn" @click="searchPlaces">검색</button>
    </div>

    <!-- 지도 출력 영역 -->
    <!-- <div id="map" style="width: 80%; height: 400px"></div> -->
    <div id="map" style="height: 400px" class="mt-4 shadow rounded"></div>
    <!-- 지도 출력 완료 -->

    <!-- <div id="menu_wrap" class="bg_white"></div> -->
    <hr />
    <article class="mb-3">
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
    <div class="mb-5">페이지</div>
    <div id="pagination" class="page"></div>

    <!-- 등록 모달창 -->
    <!-- 모달 창 -->
    <div v-if="showModal" class="modal mb-3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="card">
              <h2 class="card-title text-center">Hot Place</h2>
              <div class="card-body py-md-4">
                <div _lpchecked="1">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="hotplace.description"
                      placeholder="내용..."
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="hotplace.tag1"
                      placeholder="태그 1"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="hotplace.tag2"
                      placeholder="태그 2"
                    />
                  </div>
                  <div class="form-group">
                    <input type="file" @change="hotplaceimg" placeholder="사진" />
                  </div>
                  <div class="d-flex flex-row align-items-center justify-content-between">
                    <a @click="closeModal">취소</a>
                    <button class="btn btn-primary" @click="write">등록 하기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      // marker: null,
      map: null,
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

        if (status === window.kakao.maps.services.Status.OK) {
          this.displayMarker(data);
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
    displayMarker(data) {
      const bounds = new window.kakao.maps.LatLngBounds();

      console.log(this.markers);

      this.markers.forEach((marker) => {
        console.log("marker ::");
        console.log(marker);
        marker.setMap(null);
      });
      this.markers = [];

      for (let i = 0; i < data.length; i++) {
        var marker = new window.kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: new window.kakao.maps.LatLng(data[i].y, data[i].x), // 마커를 표시할 위치
          title: data[i].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });

        this.markers.push(marker);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      this.map.setBounds(bounds);
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
        this.sendHotplace(this.hotplace, this.img);
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
    sendHotplace(param, img) {
      writeHotplace(
        [param, img],
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
    movetoMyHotplace() {
      this.$router.push({ name: "hotplacemodify" });
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
  background: #dbe2ef;
  padding: 1rem;
}

dl > div:nth-child(4n - 2) {
  background: #dbe2ef;
}

dl > div:nth-child(4n - 1) {
  background: #dbe2ef;
}

dl > div:nth-child(4n) {
  background: #dbe2ef;
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

/* 등록 모달 */
@import url("https://fonts.googleapis.com/css?family=PT+Sans");

h2 {
  padding-top: 1.5rem;
}
a {
  color: #333;
  cursor: pointer;
}
a:hover {
  color: #3f72af;
  text-decoration: none;
}
.card {
  border: 0.4rem solid #f9f7f7;
  top: 10%;
}
.form-control {
  background-color: #f9f7f7;
  padding: 20px;
  padding: 25px 15px;
  margin-bottom: 1.3rem;
}

.form-control:focus {
  color: #000000;
  background-color: #ffffff;
  border: 3px solid #3f72af;
  outline: 0;
  box-shadow: none;
}

.btn {
  /* padding: 0.6rem 1.2rem; */
  background: #3f72af;
  border: 2px solid #3f72af;
}
.btn-primary:hover {
  background-color: #3f72af;
  border-color: #3f72af;
  transition: 0.3s;
}
#description {
  height: 100px;
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
</style>
