<template>
  <div class="container p-3">
    <div class="row justify-content-center">
      <!-- <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">My Plan</h2>
      </div> -->
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row my-2 mt-3">
          <h2 class="text-secondary px-3">{{ plan.title }}</h2>
        </div>
        <div class="row mb-3 mt-3">
          <div class="col-12 col-md-8">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
                <div class="fw-bold">{{ plan.userId }}</div>
              </div>
              <br />
              <div class="text-secondary fw-light">
                {{ plan.createdAt }} <strong>조회</strong> {{ plan.hit }}
              </div>
              <div class="d-flex flex-end">
                <b-icon
                  :class="{ 'heart-effect': isHeart, 'default-effect': true }"
                  :icon="isHeart ? 'suit-heart-fill' : 'suit-heart'"
                  @click="pushHeart()"
                ></b-icon>
              </div>
            </div>
          </div>
          <div class="divider mb-3"></div>
          <div class="container mt-3">
            <div class="d-flex flex-row row justify-content-center">
              <!-- kakao map 보여주기 -->
              <div ref="map" class="shoadow rounded col-8" style="width: 600px"></div>
              <!-- kakao map 영역 끝 -->
              <div class="plan-box container col-4 col-md-4" style="height: 25em">
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
          <div class="mt-5 mb-3 px-3">
            <div class="d-flex align-items-center">
              <b-icon
                class="mx-2 d-flex align-items-center fast-path-custom"
                icon="check2-square"
              />
              <h2>추천 경로</h2>
            </div>
          </div>
          <div class="d-flex flex-row">
            <div class="d-flex flex-row" v-for="(fastPlace, index) in fastPlaces" :key="index">
              <div class="mx-1 p-2 reco-custom d-flex align-items-center shadow">
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
          <div class="mt-5 mb-3 px-3">
            <h2>타임 라인</h2>
          </div>
          <div>
            <div v-for="(place, index) in places" :key="index">
              <div v-if="index % 2 == 0">
                <div class="mb-2 container row" style="margin: 100 auto">
                  <div
                    class="col-md-8 mb-2 p-3 travel-box d-flex flex-row align-items-center border border-4 rounded shadow"
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
                    class="col-md-8 mb-2 p-3 travel-box d-flex flex-row align-items-center border border-4 rounded shadow"
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
          <div class="mb-5, mt-3 d-flex justify-content-end">
            <div class="d-flex">
              <button
                type="button"
                id="btn-list"
                class="btn btn-outline-primary mb-3 btn-custom"
                @click="moveList()"
              >
                목록
              </button>
              <!-- 본인일때만 글수정, 글 삭제 버튼 보이도록 함 -->
              <div v-if="userInfo.userId === plan.userId || userInfo.grade === '관리자'">
                <button
                  type="button"
                  id="btn-mv-modify"
                  class="btn btn-outline-success mb-3 mx-2"
                  @click="moveModify()"
                >
                  <b-icon icon="pencil-square" /> 수정
                </button>
                <button
                  type="button"
                  id="btn-delete"
                  class="btn btn-outline-danger mb-3"
                  @click="moveDelete()"
                >
                  삭제
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
import http from "@/api/http";

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
      overlays: [],
      isHeart: false,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      console.log("loadMap :: ");
      this.loadMap();
    } else {
      console.log("loadMap :: ");
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

    http
      .get(`/plan/good/${this.userInfo.userId}/${param}`)
      .then(({ data }) => {
        if (data.message === "success") {
          this.isHeart = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          this.overlays.forEach((overlay) => {
            overlay.setMap(null);
          });
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

      this.overlays.push(overlay);
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
      } else {
        var path = this.clickLine.getPath();

        path.push(clickPosition);

        this.clickLine.setPath(path);

        var distance = Math.round(this.clickLine.getLength());
        console.log(distance);
      }
    },
    moveList() {
      this.$router.push({ name: "planlist" });
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
    /////////// 좋아요 start ///////////
    pushHeart() {
      if (this.isHeart) {
        this.isHeart = false;
        console.log("좋아요에 제거");
        http
          .delete(`/plan/good/${this.userInfo.userId}/${this.plan.id}`)
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
        console.log("좋아요에 추가");
        // 좋아요에 추가
        const goodPlan = {
          userId: this.userInfo.userId,
          planId: this.plan.id,
        };
        http
          .post(`/plan/good`, goodPlan)
          .then(({ data }) => {
            if (data.message === "success") {
              // alert("좋아요 등록!");
            } else {
              console.log("좋아요 등록 실패ㅜ");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    /////////// 좋아요 end ///////////
  },
};
</script>

<style scoped>
.reco-custom {
  /* border: solid #dbe2ef 3px; */
  border-radius: 5%;
  height: 9em;
}

.btn-custom {
  color: black;
  text-decoration: none;
  width: 4em;
}

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
