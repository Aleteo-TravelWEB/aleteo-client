<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">My Plan</h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ plan.title }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">{{ plan.userId }}</span> <br />
                <span class="text-secondary fw-light">
                  {{ plan.createdAt }} 조회 : {{ plan.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="divider mb-3"></div>
          <div class="container">
            <div class="d-flex flex-row justify-content-center">
              <!-- kakao map 보여주기 -->
              <div ref="map" class="shoadow rounded col-8" style="width: 600px"></div>
              <!-- kakao map 영역 끝 -->
              <div class="plan-box container col-md-4" style="height: 25em">
                <div class="row">
                  <div class="col-md-6">
                    <label for="register-id">등록자</label>
                    <input
                      id="register-id"
                      type="text"
                      readonly="readonly"
                      :value="plan.userId"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="register-date">등록일</label>
                    <input
                      id="register-date"
                      type="text"
                      readonly="readonly"
                      :value="plan.createdAt"
                      class="form-control"
                    />
                  </div>
                </div>
                <label for="plan-title">계획 이름</label>
                <input
                  id="plan-title"
                  type="text"
                  readonly="readonly"
                  :value="plan.title"
                  class="form-control"
                />
                <div class="row">
                  <div class="col-md-6">
                    <label for="plan-start-date">출발일</label>
                    <input
                      id="plan-start-date"
                      type="text"
                      readonly="readonly"
                      :value="plan.startDate"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="plan-end-date">도착일</label>
                    <input
                      id="plan-end-date"
                      type="text"
                      readonly="readonly"
                      :value="plan.endDate"
                      class="form-control"
                    />
                  </div>
                </div>
                <label for="plan-description">계획 상세</label>
                <input
                  id="plan-description"
                  type="text"
                  readonly="readonly"
                  :value="plan.description"
                  class="form-control overflow-auto"
                  style="height: 10em"
                />
              </div>
            </div>
          </div>
          <div class="divider mb-4"></div>
          <div>
            <h2>추천 경로</h2>
          </div>
          <div class="d-flex flex-row">
            <div class="d-flex flex-row" v-for="(fastPlace, index) in fastPlaces" :key="index">
              <div class="border border-4 rounded me-1 p-2">
                <div class="travel-info">
                  <strong class="fast_place_name">{{ fastPlace.name }}</strong>
                  <p class="fast_address">{{ fastPlace.address }}</p>
                  <div class="fast_lat" style="display: none">{{ fastPlace.lat }}</div>
                  <div class="fast_lng" style="display: none">{{ fastPlace.lng }}</div>
                </div>
              </div>
              <div class="d-flex align-items-center" v-if="index !== fastPlaces.length - 1">
                <img
                  src="@/assets/img/icon/arrows.png"
                  alt="화살표"
                  style="width: 3em; height: 3em"
                />
              </div>
            </div>
          </div>
          <div class="divider mb-3"></div>
          <div class="align-middle">
            <h2>타임 라인</h2>
            <div v-for="(place, index) in places" :key="index">
              <div v-if="index % 2 == 0">
                <div class="mb-2 container row" style="margin: 100 auto">
                  <div
                    class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded"
                    style="width: 50%; margin: 0 auto"
                  >
                    <img
                      src="@/assets/img/noimage.png"
                      :alt="place.name"
                      style="width: 50%"
                      class="me-2"
                    />
                    <div class="travel-info">
                      <h2 class="place_name">{{ place.name }}</h2>
                      <p class="address">{{ place.address }}</p>
                      <div class="lat" style="display: none">{{ place.lat }}</div>
                      <div class="lng" style="display: none">{{ place.lng }}</div>
                    </div>
                  </div>
                  <div class="col-md-4" style="width: 10em"></div>
                </div>
              </div>
              <div v-else>
                <div class="mb-2 row">
                  <div style="width: 10em" class="col-md-4"></div>
                  <div
                    class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded"
                    style="width: 50%; margin: 0 auto"
                  >
                    <img
                      src="@/assets/img/noimage.png"
                      :alt="place.name"
                      style="width: 50%"
                      class="me-2"
                    />
                    <div class="travel-info">
                      <h2 class="place_name">{{ place.name }}</h2>
                      <p class="address">{{ place.address }}</p>
                      <div class="lat" style="display: none">{{ place.lat }}</div>
                      <div class="lng" style="display: none">{{ place.lng }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="">
            <div class="d-flex justify-content-end">
              <button type="button" id="btn-list" class="btn submit-btn mb-3">
                <router-link :to="{ name: 'planlist' }">여행 목록</router-link>
              </button>
              <!-- 본인일때만 글수정, 글 삭제 버튼 보이도록 함 -->
              <div v-if="this.userInfo.userId === plan.userId">
                <button
                  type="button"
                  id="btn-mv-modify"
                  class="btn btn-outline-success mb-3 ms-1"
                  @click="moveModify()"
                >
                  글수정
                </button>
                <button
                  type="button"
                  id="btn-delete"
                  class="btn btn-outline-danger mb-3 ms-1"
                  @click="moveDelete()"
                >
                  글삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { viewPlan, deletePlan } from "@/api/plan";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "PlanView",
  components: {},
  data() {
    return {
      plan: [],
      fastPlaces: [],
      places: [],
      map: null,
      clickLine: [],
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
  created() {
    let param = this.$route.params.planId;
    // console.log("param :: " + param);
    viewPlan(
      param,
      ({ data }) => {
        // console.log("plan view data :: ");
        // console.log(data);
        this.plan = data.plan;
        this.fastPlaces = data.fastPlaces;
        this.places = data.places;

        this.loadMarker(this.places);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(this.loadMap);
      };

      document.head.appendChild(script);
    },
    loadMap() {
      console.log(window.kakao);
      if (window.kakao != undefined) {
        // const container = document.getElementById("map");
        const container = this.$refs.map;
        const options = {
          center: new window.kakao.maps.LatLng(37.500613, 127.036431),
          level: 5,
        };

        this.map = new window.kakao.maps.Map(container, options);

        this.loadMarker(this.places);
      }
    },
    loadMarker(positions) {
      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      var evalLat = null;
      var evalLng = null;
      var len = positions.length;

      for (let i = 0; i < len; i++) {
        // console.log("positions :: ");
        // console.log(positions[i]);
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng), // 마커를 표시할 위치
          title: positions[i].place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

        evalLat += positions[i].lat;
        evalLng += positions[i].lng;

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        window.kakao.maps.event.addListener(marker, "click", () => {
          // this.makeMapUrl(positions[i]);
          this.displayCustomOverlay(positions[i]);
        });

        // 선 생성
        this.drawLine(positions[i], i);
      }

      this.map.setCenter(new window.kakao.maps.LatLng(evalLat / len, evalLng / len));
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

      var overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: new window.kakao.maps.LatLng(marker.lat, marker.lng),
      });

      overlay.setMap(this.map);
    },
    // 지도에 선 그리는 메소드
    drawLine(position, index) {
      // console.log(position);
      var clickPosition = new window.kakao.maps.LatLng(position.lat, position.lng);

      if (index === 0) {
        this.clickLine = new window.kakao.maps.Polyline({
          map: this.map,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        this.displayCircleDot(clickPosition, 0);
      } else {
        var path = this.clickLine.getPath();

        path.push(clickPosition);

        this.clickLine.setPath(path);

        var distance = Math.round(this.clickLine.getLength());

        this.displayCircleDot(clickPosition, distance);
      }
    },
    displayCircleDot(position, distance) {
      var circleOverlay = new window.kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      circleOverlay.setMap(this.map);

      if (distance > 0) {
        var distanceOverlay = new window.kakao.maps.CustomOverlay({
          content:
            '<div class="dotOverlay border">거리 <span class="number">' +
            distance +
            "</span>m</div>",
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        distanceOverlay.setMap(this.map);
      }
      // this.dots.push({ circle: circleOverlay, distance: distanceOverlay});
    },
    moveModify() {
      this.$router.push({ name: "planmodify", params: { planId: this.plan.id } });
    },
    moveDelete() {
      if (!confirm("정말 삭제하시겠습니까?")) {
        return;
      }
      deletePlan(
        this.plan.id,
        ({ data }) => {
          1;
          if (data.message === "success") {
            this.$router.push({ name: "planlist" });
          } else {
            alert("삭제 실패!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped></style>
