<template>
  <div>
    <div class="container">
      <div class="map-area">
        <div class="searchbox rounded">
          <!-- <form class="d-flex my-3" onsubmit="return false;" role="search"> -->
          <div class="d-flex flex-row justify-content-center">
            <input
              id="search-keyword"
              class="col-7 form-control m-2"
              type="text"
              placeholder="검색어"
              aria-label="검색어"
              v-model="search.keyword"
              @keyup.enter="searchPlace"
            />
            <button
              id="btn-search"
              class="border btn submit-btn col-3 m-2"
              type="button"
              @click="searchPlace"
            >
              검색
            </button>
          </div>
          <!-- </form> -->
          <div class="results">
            <div
              class="place d-flex justify-content-between"
              v-for="rs in search.results"
              :key="rs.id"
              @click="showPlace(rs)"
            >
              <!-- <img :src="rs." :alt=""> -->
              <div class="col-8">
                <Strong>{{ rs.place_name }}</Strong>
                <div class="addr">{{ rs.address_name }}</div>
              </div>
              <div>
                <b-icon
                  class="col-3"
                  icon="plus-square-fill"
                  variant="primary"
                  @click="addPlan(rs)"
                ></b-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- map이 들어갈 위치 -->
      <!-- kakao map start -->
      <div ref="map" class="shadow rounded" style="width: 100px; height: 100px"></div>
      <!-- kakao map end -->
      <div>
        <div class="divider mb-5"></div>
        <aside>
          <!-- 여행 계획 들어가는 영역 -->
          <div
            class="d-flex flex-column justify-content-center mx-auto p-2"
            style="width: 100%; height: 35em"
          >
            <h3 id="plan-title" class="text-center p-2"><strong>여행 계획</strong></h3>
            <form id="plan-form" onsubmit="return false;" role="search" method="POST">
              <input type="hidden" name="action" value="save" />
              <div>
                <div>
                  <div
                    id="plan-content"
                    class="rounded border rounded border-5 bg-light shadow mb-2 mx-auto p-2 overflow-auto d-flex justify-content-center"
                    style="width: 100%; height: 10em"
                  >
                    <div v-for="(place, index) in places" :key="index">
                      <div :id="place.palceId">
                        <div class="text-center p-2">
                          <div class="place-title">{{ place.name }}</div>
                          <div>{{ place.address }}</div>
                          <div class="lat" style="display: none">{{ place.lat }}</div>
                          <div class="lng" style="display: none">{{ place.lng }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider mb-3"></div>
                <div id="plan-detail" class="d-flex flex-column align-items-center rounded mx-auto">
                  <label for="name"><strong>계획 이름</strong></label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    v-model="plan.title"
                    placeholder="계획 이름"
                    class="plan-detail-content align-middle ms-2 mt-2 rounded shadow border-light-subtle"
                    style="width: 70%"
                  />
                  <br />
                  <div
                    class="plan-detail-date d-flex flex-row justify-content-between mb-3"
                    style="width: 70%"
                  >
                    <label for="start_datepicker"><strong>출발일</strong></label>
                    <input
                      type="date"
                      name="startDate"
                      v-model="plan.startDate"
                      id="start_datepicker"
                      placeholder="년도-월-일"
                      style="width: 8em; height: 1.8em"
                      class="plan-detail-content plan-detail-start ms-2 me-2 align-middle rounded shadow border-light-subtle"
                    />
                    <label for="end_datepicker"><strong>도착일</strong></label>
                    <input
                      type="date"
                      name="endDate"
                      v-model="plan.endDate"
                      id="end_datepicker"
                      placeholder="년도-월-일"
                      style="width: 8em; height: 1.8em"
                      class="plan-detail-content plan-detail-end ms-2 me-2 align-middle rounded shadow border-light-subtle"
                    />
                  </div>
                  <label for="description"><strong>상세 계획</strong></label>
                  <textarea
                    name="description"
                    v-model="plan.description"
                    id="description"
                    placeholder="상세 계획을 적어보자!"
                    class="plan-detail-content align-middle ms-2 mt-2 rounded shadow border-light-subtle"
                    style="width: 70%; height: 10em"
                  ></textarea>
                  <br />
                  <button
                    class="place-add z-3 border rounded btn btn-primary shadow p-2"
                    id="plan-save-btn"
                    style="top: 5px; left: 120px"
                    type="button"
                    @click="modifyPlan"
                  >
                    <strong>여행 계획 수정</strong>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { viewPlan } from "@/api/plan";

const userStore = "userStore";
const planStore = "planStore";

export default {
  name: "PlanModify",
  components: {},
  computed: {
    ...mapState(planStore, ["isModify"]),
    ...mapState(userStore, ["userInfo"]),
  },
  data() {
    return {
      plan: [],
      places: [],
      mapOption: {
        center: {
          lat: 37.500613,
          lng: 127.036431,
        },
        level: 8,
      },
      search: {
        // 검색 키워드에 따른 결과
        keyword: null,
        pgn: null,
        results: [],
      },
      map: null, // 지도
      markers: [], // 마커 객체 담는 배열
      planMarkers: [], // 계획에 포함된 마커 객체 담는 배열
      overlays: [], // 오버레이 담는 배열
      drawingFlag: false,
      lines: [],
      clickLine: null,
      dots: [],
      circleOverlays: [],
      addVal: null,
      isAddFlag: false, // 검색한 여행지 추가 후 타이틀을 선택했는지 판단하는 flag
    };
  },
  created() {
    let param = this.$route.params.planId;
    console.log("param :: " + param);
    viewPlan(
      param,
      ({ data }) => {
        console.log("data :: ");
        console.log(data);
        this.plan = data.plan;
        this.places = data.places;

        console.log("places :: ");
        console.log(this.places);

        this.loadMaker(this.places, true);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      console.log("loadMap :: ");
      this.loadMap();
    } else {
      console.log("loadScript :: ");
      this.loadScript();
    }
  },
  watch: {
    "search.results": {
      handler() {
        if (this.search.results.length > 0) {
          this.loadMaker(this.search.results, false);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(planStore, ["planModify"]),
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(this.loadMap);
      };

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      console.log(window.kakao);
      // const container = document.getElementById("map");
      const container = this.$refs.map;
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 8,
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
    searchPlace() {
      this.isAddFlag = false;
      const keyword = this.search.keyword;
      if (keyword === null || keyword.length === 0) {
        return;
      }
      // 결과값 초기화
      this.search.keyword = null;
      this.search.pgn = null;
      this.search.results = [];

      const ps = new window.kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(keyword, (data, status, pgn) => {
        this.search.keyword = keyword;
        this.search.pgn = pgn;
        this.search.results = data;
      });

      this.map.setLevel(8);
    },
    showPlace(rs) {
      // console.log(rs)

      // 여행지를 추가한 후에 다시 타이틀을 클릭한 거라면 해당 마크 보여주기
      if (this.isAddFlag) {
        const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(rs.y, rs.x), // 마커를 표시할 위치
          title: rs.place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });
        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        this.markers.push(marker);

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          this.displayCustomOverlay(rs);
        });
      }

      this.map.setCenter(new window.kakao.maps.LatLng(rs.y, rs.x));
      this.map.setLevel(5);

      // 열려져 있던 오버레이 다 닫기
      this.overlays.forEach((overlay) => {
        // console.log(overlay)
        overlay.setMap(null);
      });
      this.overlays = [];

      this.displayCustomOverlay(rs);
    },
    // 지정한 위치에 마커 불러오기
    loadMaker(positions, isFirstLoad) {
      console.log("positions :: ");
      console.log(positions);

      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      // 이전에 추가된 마커들 제거
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];

      for (let i = 0; i < positions.length; i++) {
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        var x = null;
        var y = null;
        var place_name = null;

        if (isFirstLoad) {
          x = positions[i].lng;
          y = positions[i].lat;
          place_name = positions[i].name;
        } else {
          x = positions[i].x;
          y = positions[i].y;
          place_name = positions[i].place_name;
        }

        console.log(" x y :: " + x + ", " + y);
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(y, x), // 마커를 표시할 위치
          title: place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });
        // console.log("marker :: ");
        // console.log(marker);

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        this.markers.push(marker);

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          // this.makeMapUrl(positions[i]);
          this.displayCustomOverlay(positions[i]);
        });
      }

      this.map.setCenter(new window.kakao.maps.LatLng(positions[0].y, positions[0].x));
    },
    //커스텀 오버레이 표시 함수
    displayCustomOverlay(marker) {
      let image = "";
      if (marker.image !== "") {
        image = marker.image;
      } else {
        image = require("@/assets/img/noimage.png");
      }

      let content = `
		<div class="wrap">
			<div class="info">
				<div class="title">
					${marker.place_name}
					<div class="close" @click="closeOverlay()" title="닫기"></div>
				</div>
				<div class="body">
					<div class="img">
						<img src="${image}" width="73" height="70">
					</div>
					<div class="desc">
						<div class="ellipsis mb-1">${marker.address_name}</div>
						<div class="jibun ellipsis">(전) ${marker.phone}</div>
						<div class="mt-1">`;

      content += `<a href="https://map.kakao.com/link/to/${marker.place_name},${marker.y},${marker.x}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

      var overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: new window.kakao.maps.LatLng(marker.y, marker.x),
      });

      overlay.setMap(this.map);

      this.overlays.push(overlay);
    },
    // 커스텀 오버레이를 닫는 함수
    closeOverlay() {
      this.overlays.forEach((overlay) => {
        // console.log(overlay)
        overlay.setMap(null);
      });
      this.overlays = [];
    },
    // 지도에 선 그리는 메소드
    drawLine(position) {
      // console.log(position);
      var clickPosition = new window.kakao.maps.LatLng(position.y, position.x);

      if (!this.drawingFlag) {
        this.drawingFlag = true;
        // deleteClickLine();
        // deleteDistance();
        // deleteCircleDot();

        this.clickLine = new window.kakao.maps.Polyline({
          map: this.map,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        this.lines.push(this.clickLine);

        this.displayCircleDot(clickPosition, 0);
      } else {
        var path = this.clickLine.getPath();

        path.push(clickPosition);

        this.clickLine.setPath(path);

        var distance = Math.round(this.clickLine.getLength());
        this.displayCircleDot(clickPosition, distance);
      }
    },
    deleteClickLine() {
      if (this.clickLine) {
        this.clickLine.setMap(null);
        this.clickLine = null;
      }
    },
    displayCircleDot(position, distance) {
      var circleOverlay = new window.kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      this.circleOverlays.push(circleOverlay);

      circleOverlay.setMap(this.map);

      if (distance > 0) {
        var distanceOverlay = new window.kakao.maps.CustomOverlay({
          content:
            '<div class="dotOverlay">거리 <span class="number">' + distance + "</span>m</div>",
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        distanceOverlay.setMap(this.map);
      }
      this.dots.push({ circle: circleOverlay, distance: distanceOverlay });
    },
    addPlan(data) {
      this.isAddFlag = true;
      this.drawLine(data);
      // console.log("data: " + data.id);

      let planContent = document.querySelector("#plan-content");

      for (let i = 0; i < this.places.length; i++) {
        if (this.places[i].placeId === data.id) {
          return;
        }
      }

      let makeDiv = `<div id='${data.id}' class="border rounded border-5" sytle="margin-right: 2px; border-color: cadetblue; border: thick; width: 100%; height: 100px;">
												<div class='text-center p-2'>
														<div class="place-title">${data.place_name}</div>
														<div>${data.address_name}</div>
														<div class="lat" style="display: none;">${data.y}</div>
														<div class="lng" style="display: none;">${data.x}</div>
												</div>`;

      planContent.innerHTML += makeDiv;
      const placeData = {
        placeId: data.id,
        name: data.place_name,
        address: data.address_name,
        lat: data.y,
        lng: data.x,
      };
      this.places.push(placeData);

      // 선택된 애를 제외하고 마크 삭제
      let lat = (data.y * 1).toFixed(13);
      let lng = (data.x * 1).toFixed(13);

      this.markers.forEach((marker) => {
        if (
          marker.getTitle() === data.place_name &&
          marker.getPosition().getLat().toFixed(13) === lat &&
          marker.getPosition().getLng().toFixed(13) === lng
        ) {
          // console.log("data.place_name : " + data.place_name);
          this.planMarkers.push(marker);
        } else {
          let planFlag = false;
          for (let i = 0; i < this.planMarkers.length; i++) {
            if (
              this.planMarkers[i].getTitle() === marker.getTitle() &&
              this.planMarkers[i].getPosition().getLat().toFixed(13) ===
                marker.getPosition().getLat().toFixed(13) &&
              this.planMarkers[i].getPosition().getLng().toFixed(13) ===
                marker.getPosition().getLng().toFixed(13)
            ) {
              planFlag = true;
              break;
            }
          }
          if (!planFlag) {
            marker.setMap(null);
          }
        }
      });
    },
    async modifyPlan() {
      // console.log("places: " + this.places);
      if (!confirm("수정 하시겠습니까?")) {
        return;
      }

      this.plan.userId = this.userInfo.userId;
      await this.planModify([this.plan, this.places]);
      if (this.isModify) {
        // console.log("regist plan :: " + this.isRegist);
        this.$router.push({ name: "planlist" });
      }
    },
  },
};
</script>

<style lang="scss">
.map-area {
  display: flex;
  position: relative;
  margin-top: 13px;
  .searchbox {
    position: absolute;
    top: 0;
    left: 0;
    height: 600px;
    z-index: 10000;
    background-color: #ffffffaa;
    width: 300px;
    display: flex;
    flex-direction: column;
    .results {
      flex: 1 1 auto;
      overflow-y: auto;
      .place {
        padding: 8px;
        cursor: pointer;

        &:hover {
          background-color: aliceblue;
        }
        h4 {
          margin: 0;
        }
      }
    }
  }
}

.add-custom {
  z-index: 10000;
}

#map {
  height: 600px;
}
</style>

<style>
.btn-custom {
  width: 20px;
  height: 20px;
}
</style>
