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
                  @click="addPlace(rs)"
                ></b-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- map이 들어갈 위치 -->
      <!-- kakao map start -->
      <div id="map" ref="map" class="shadow rounded"></div>
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
                    <div v-for="(place, index) in places" :key="index" class="border rounded">
                      <b-row align-h="end">
                        <b-icon
                          class="col-3"
                          icon="dash-square-fill"
                          variant="danger"
                          @click="deletePlace(place.placeId)"
                        ></b-icon>
                      </b-row>
                      <div class="text-center p-2">
                        <div class="place-title">{{ place.name }}</div>
                        <div>{{ place.address }}</div>
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
      search: {
        // 검색 키워드에 따른 결과
        keyword: null,
        pgn: null,
        results: [],
      },
      map: null, // 지도
      // 마커
      markers: [], // 마커 객체 담는 배열
      planMarkers: [], // 계획에 포함된 마커 객체 담는 배열
      // 오버레이
      overlays: [], // 오버레이 담는 배열
      // 선그리기
      drawingFlag: false,
      clickLine: null,
      clickLines: [],
      dots: [],
      addVal: null,
      places: [],
      isAddFlag: false, // 검색한 여행지 추가 후 타이틀을 선택했는지 판단하는 flag
    };
  },
  created() {
    let param = this.$route.params.planId;
    viewPlan(
      param,
      ({ data }) => {
        this.plan = data.plan;
        this.places = data.places;
        this.loadMap();
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // created보다 다음으로 호출되며 자식, 부모순으로 실행되므로 컴포넌트, 템플릿, 렌더링된 돔에 접근이 가능하다.
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
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
    ////////////////////// 지도 불러오기 start //////////////////////
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
      const container = this.$refs.map;
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 5,
      };

      this.map = new window.kakao.maps.Map(container, options);
      this.loadMaker(this.places, true, this.places);
      this.places.forEach((place) => {
        this.drawLine(place, true);
      });
    },
    ////////////////////// 지도 불러오기 end //////////////////////

    ////////////////////// 검색하기 start //////////////////////
    // 장소 검색하는 메소드
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
    // 검색한 관광지를 지도에 띄우는 메소드
    showPlace(rs) {
      // rs : 관광지 정보

      // 여행지를 추가한 후에 다시 타이틀을 클릭한 거라면 해당 마크 보여주기
      if (this.isAddFlag) {
        const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(rs.y, rs.x), // 마커를 표시할 위치
          title: rs.id, // a마커의 타이틀, 마커의 장소 id 넣기
          image: markerImage, // 마커 이미지
        });
        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        this.markers.push(marker);

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          this.overlays.forEach((overlay) => {
            overlay.setMap(null);
          });
          this.displayCustomOverlay(rs, false);
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

      this.displayCustomOverlay(rs, false);
    },
    ////////////////////// 검색하기 end //////////////////////

    ////////////////////// 마커 그리기 start //////////////////////
    // 지정한 위치에 마커 불러오기
    loadMaker(positions, flag, data) {
      // flag : true(원래 여행 관광지 정보), false(새로 만드는 관광지 정보)
      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      // 이전에 추가된 마커들 제거
      if (this.markers) {
        this.markers.forEach((marker) => marker.setMap(null));
        this.markers = [];
      }

      for (let i = 0; i < positions.length; i++) {
        var y = null;
        var x = null;
        if (flag) {
          // 원래 여행 관광지 정보
          y = positions[i].lat;
          x = positions[i].lng;
        } else {
          y = positions[i].y;
          x = positions[i].x;
        }

        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(y, x), // 마커를 표시할 위치
          title: positions[i].id, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        this.markers.push(marker);

        // 원래 여행 관광지 정보 마커 배열에 넣기
        if (flag && this.planMarkers) {
          console.log("check");
          const markerData = {
            marker: marker,
            placeId: data.placeId,
          };
          this.planMarkers.push(markerData);
        }

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          this.overlays.forEach((overlay) => {
            overlay.setMap(null);
          });
          this.displayCustomOverlay(positions[i], true);
        });
      }

      if (flag && positions.length > 0)
        this.map.setCenter(new window.kakao.maps.LatLng(positions[0].lat, positions[0].lng));
      else if (positions.length > 0) {
        this.map.setCenter(new window.kakao.maps.LatLng(positions[0].y, positions[0].x));
      }
    },
    // 마커 삭제하기
    deleteMarker(lat, lng, data) {
      this.markers.forEach((marker) => {
        if (
          marker.getPosition().getLat().toFixed(13) === lat &&
          marker.getPosition().getLng().toFixed(13) === lng
        ) {
          if (this.planMarkers) {
            const markerData = {
              marker: marker,
              placeId: data.id,
            };
            this.planMarkers.push(markerData);
            // console.log(this.planMarkers);
          }
        } else {
          // 검색했을 때 뜨는 마커들 삭제 : flag = false
          let planFlag = false;

          for (let i = 0; i < this.planMarkers.length; i++) {
            if (
              this.planMarkers[i].marker.getTitle() === marker.getTitle() &&
              this.planMarkers[i].marker.getPosition().getLat().toFixed(13) ===
                marker.getPosition().getLat().toFixed(13) &&
              this.planMarkers[i].marker.getPosition().getLng().toFixed(13) ===
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
    ////////////////////// 마커 그리기 end //////////////////////

    ////////////////////// 커스텀 오버레이 start //////////////////////
    //커스텀 오버레이 표시 함수
    displayCustomOverlay(marker, flag) {
      // flag : true(원래 여행 관광지 정보), false(새로 만드는 관광지 정보)
      let image = "";
      if (marker.image !== "") {
        image = marker.image;
      } else {
        image = require("@/assets/img/noimage.png");
      }

      var content = null;
      var y = null;
      var x = null;
      if (flag) {
        content = `
		<div class="wrap">
			<div class="info">
				<div class="title">
					${marker.name}
					<div class="close" @click="closeOverlay()" title="닫기"></div>
				</div>
				<div class="body">
					<div class="img">
						<img src="${image}" width="73" height="70">
					</div>
					<div class="desc">
						<div class="ellipsis mb-1">${marker.address}</div>
						<div class="mt-1">`;

        content += `<a href="https://map.kakao.com/link/to/${marker.name},${marker.lat},${marker.lng}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
        y = marker.lat;
        x = marker.lng;
      } else {
        content = `
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
						<div class="mt-1">`;

        content += `<a href="https://map.kakao.com/link/to/${marker.place_name},${marker.y},${marker.x}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
        y = marker.y;
        x = marker.x;
      }

      var overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: new window.kakao.maps.LatLng(y, x),
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
    ////////////////////// 커스텀 오버레이 end //////////////////////

    ////////////////////// 선 그리기 start //////////////////////
    // 지도에 선 그리는 메소드
    drawLine(position, flag) {
      // flag: true(관광지 정보 그대로 받아들일 때 : data(x,y)), false(this.places 타입  (lat, lng))
      var clickPosition = null;
      if (!flag) {
        clickPosition = new window.kakao.maps.LatLng(position.y, position.x);
      } else {
        clickPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
      }

      if (!this.drawingFlag) {
        this.drawingFlag = true;

        this.clickLine = new window.kakao.maps.Polyline({
          map: this.map,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
      } else {
        var path = this.clickLine.getPath();

        path.push(clickPosition);

        this.clickLine.setPath(path);

        var distance = Math.round(this.clickLine.getLength());
        console.log("distance : " + distance);
      }
    },
    // 선 삭제하기
    deleteLine() {
      if (this.clickLine) {
        this.clickLine.setMap(null);
        this.clickLine = null;
      }
    },
    ////////////////////// 선 그리기 end //////////////////////

    ////////////////////// 관광지를 여행계획에 넣기 start //////////////////////
    addPlace(data) {
      this.isAddFlag = true;
      this.drawLine(data, false);

      // 이미 places에 넣어져 있는 거면 넘어가기
      for (let i = 0; i < this.places.length; i++) {
        if (this.places[i].placeId == data.id) {
          return;
        }
      }

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

      this.deleteMarker(lat, lng, data);
    },
    // 추가된 관광지 삭제
    deletePlace(placeId) {
      this.places = this.places.filter((place) => place.placeId !== placeId);

      // 마커 삭제
      let lat = (this.places.lat * 1).toFixed(13);
      let lng = (this.places.lng * 1).toFixed(13);

      this.planMarkers = this.planMarkers.filter((marker) => marker.placeId !== placeId);

      this.deleteMarker(lat, lng, this.places);

      // 그려진 선 삭제
      this.deleteLine();

      this.drawingFlag = false;

      // 선 다시 그리기
      console.log("drawing :: ");
      this.places.forEach((place) => {
        this.drawLine(place, true);
      });
    },
    ////////////////////// 관광지를 여행계획에 넣기 end //////////////////////
    async modifyPlan() {
      console.log("places: " + this.places);
      if (!confirm("수정 하시겠습니까?")) {
        return;
      }

      this.plan.userId = this.userInfo.userId;
      await this.planModify([this.plan, this.places]);
      if (this.isModify) {
        // console.log("regist plan :: " + this.isRegist);
        this.$router.push({ name: "planview", params: { planId: this.plan.id } });
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

.map-custom {
  width: 800px;
  height: 600px;
}
</style>
