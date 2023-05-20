<template>
  <div>
    <div>등록하러 왔어요</div>
    <div class="map_wrap">
      <div class="option">
        <div>
          <input
            type="text"
            placeholder="나만의 핫플레이스"
            class="search-input"
            v-model="search.keyword"
            @keyup.enter="searchPlaces"
            id="keyword"
            size="15"
          />
          <button type="button" @click="searchPlaces" class="search-button">검색하기</button>
        </div>
        <!-- 지도 출력 영역 -->
        <!-- <div id="map" style="width: 80%; height: 400px"></div> -->
        <div id="map" class="shadow rounded"></div>
        <!-- 지도 출력 완료 -->

        <!-- <div id="menu_wrap" class="bg_white"></div> -->
        <hr />
        <div class="results">
          <div
            class="place"
            v-for="result in search.results"
            :key="result.id"
            @click="moveMap(result)"
          >
            <h4 class="result-text">{{ result.place_name }}</h4>
            <div class="addr">
              {{ result.address_name }}
              <button class="search-button" @click="openModal(result)">등록하기</button>
            </div>
          </div>
          <div>페이지 번호</div>
          <div id="pagination" class="page"></div>
        </div>
      </div>
    </div>
    <!-- 등록 모달창 -->
    <!-- 모달 창 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>핫플레이스 등록하기</h2>
        <p>모달 내용을 여기에 작성하세요.</p>
        내용 :<input
          type="text"
          placehodler="이 장소에 대해 설명해주세요~~"
          v-model="hotplace.description"
          class="modal-input"
          id="description"
        />
        태그 1:<input type="text" placehodler="태그1" v-model="hotplace.tag1" class="modal-input" />
        태그 2:<input type="text" placehodler="태그2" v-model="hotplace.tag2" class="modal-input" />
        사진 : <input type="file" @change="hotplaceimg" />
        <button type="button" @click="write" class="search-button">등록</button>
        <button type="button" @click="closeModal" class="search-button">취소</button>
      </div>
    </div>
  </div>
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

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    },
    moveMap(place) {
      console.log("click!!");
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
      } else {
        this.sendHotplace(this.hotplace, this.img);
      }
    },
    closeModal() {
      this.showModal = false;
      this.hotplace.description = null;
      this.hotplace.tag1 = null;
      this.hotplace.tag2 = null;
    },
    hotplaceimg(event) {
      this.img = event.target.files[0];
      console.log(this.img);
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
  },
};
</script>

<style scoped>
.search-input {
  border: 1px solid;
  border-radius: 3px;
  width: 200px;
  margin-right: 10px;
}
.search-button {
  border: 1px solid;
  border-radius: 3px;
  margin-right: 10px;
}
.result-text {
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  border: 1px solid;
  font-size: 30px;
  margin: 10px; /* Add margin to create spacing */
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
</style>
