<template>
  <div class="row justify-content-center p-3">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="my-2 mt-3">
        <h2 class="text-secondary px-3">{{ plan.title }}</h2>
        <div class="d-flex justify-content-end">
          <b-icon
            :class="{ 'heart-effect': isHeart, 'default-effect': true }"
            :icon="isHeart ? 'suit-heart-fill' : 'suit-heart'"
            @click="pushHeart()"
          ></b-icon>
        </div>
      </div>
      <hr />
      <!-- 상단 조회수, 좋아요 등등 start -->
      <div class="mb-3 mt-3 px-5">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <div class="fw-bold">{{ plan.userId }}</div>
          </div>
          <div><b-icon icon="clock-fill" class="mx-1" /> {{ plan.createdAt }}</div>
          <div>조회 {{ plan.hit }}</div>
        </div>
      </div>
      <hr />
      <!-- 상단 조회수, 좋아요 등등 end -->
      <div class="divider mb-3"></div>
      <!-- kakao map 보여주기 -->
      <div class="d-flex justify-content-center">
        <div ref="map" class="shadow rounded col-8" style="height: 400px"></div>
      </div>
      <div class="divider mb-3"></div>
      <!-- kakao map 영역 끝 -->
      <div class="mt-5">
        <div class="d-flex justify-content-center">
          <div class="d-flex justify-content-center">
            <p class="mx-3"><b-icon icon="arrow-up-right-square-fill" class="mx-1" /> 출발일</p>
            <p>{{ plan.startDate }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <p class="mx-3"><b-icon icon="arrow-down-right-square" class="mx-1" /> 도착일</p>
            <p>{{ plan.endDate }}</p>
          </div>
        </div>
        <div class="mb-5 mt-3">{{ plan.description }}</div>
      </div>
      <hr />
      <div>
        <div class="mt-5 mb-3 px-3">
          <div class="d-flex align-items-center reco-path-custom" @click="showRePath()">
            <b-icon
              class="mx-2 d-flex align-items-center fast-path-custom"
              icon="check2-square"
              animation="cylon-vertical"
            />
            <h2>추천 경로</h2>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-center flex-wrap">
          <div class="d-flex flex-row width" v-for="(fastPlace, index) in fastPlaces" :key="index">
            <div class="mx-1 p-2 reco-custom d-flex align-items-center shadow mb-5">
              <div>
                <strong class="fast_place_name">{{ fastPlace.name }}</strong>
                <p class="fast_address">{{ fastPlace.address }}</p>
                <div class="fast_lat" style="display: none">{{ fastPlace.lat }}</div>
                <div class="fast_lng" style="display: none">{{ fastPlace.lng }}</div>
              </div>
            </div>
            <div class="d-flex align-items-center mb-3" v-if="index !== fastPlaces.length - 1">
              <img
                src="@/assets/img/icon/arrows.png"
                alt="화살표"
                style="width: 3em; height: 3em"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="divider mb-3"></div>
      <hr />
      <div>
        <div class="mt-5 mb-3 px-3">
          <div class="d-flex align-items-center">
            <b-icon class="mx-2 d-flex align-items-center" icon="clock-history" />
            <h2>타임 라인</h2>
          </div>
        </div>
        <div>
          <div v-for="(place, index) in places" :key="index">
            <div v-if="index % 2 == 0">
              <div class="mb-2 container" style="margin: 100 auto">
                <div
                  class="mb-2 p-3 travel-box d-flex flex-row align-items-center border border-4 rounded shadow timeline-custom"
                >
                  <img :src="place.imageUrl" :alt="place.name" style="width: 130px" class="me-2" />
                  <div class="travel-info">
                    <div class="mb-3">
                      <b-icon icon="pin-fill" class="mx-1" /><strong class="place_name">{{
                        place.name
                      }}</strong>
                    </div>
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
                  class="mb-2 p-3 travel-box d-flex flex-row align-items-center border border-4 rounded shadow timeline-custom"
                >
                  <img
                    :src="place.imageUrl"
                    :alt="place.name"
                    style="width: 130px"
                    class="me-2 card-img"
                  />
                  <div class="travel-info">
                    <div class="mb-3">
                      <b-icon icon="pin-fill" class="mx-1" /><strong class="place_name">{{
                        place.name
                      }}</strong>
                    </div>
                    <p class="address">{{ place.address }}</p>
                    <div class="lat" style="display: none">{{ place.lat }}</div>
                    <div class="lng" style="display: none">{{ place.lng }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5, mt-5 d-flex justify-content-end">
        <div class="d-flex">
          <button
            type="button"
            id="btn-list"
            class="btn btn-jelly mb-3"
            style="background-color: #f7f7f7"
            @click="moveList()"
          >
            목록
          </button>
          <!-- 본인일때만 글수정, 글 삭제 버튼 보이도록 함 -->
          <div v-if="userInfo.userId === plan.userId || userInfo.grade === '관리자'">
            <button
              type="button"
              class="btn btn-jelly mb-3 mx-2"
              @click="moveModify()"
              id="modify-button"
            >
              <b-icon icon="pencil-square" /> 수정
            </button>
            <button
              type="button"
              class="btn btn-jelly mb-3"
              style="background-color: #ff4141"
              @click="moveDelete()"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 추천 경로 모달 start -->
    <div v-show="isReShow" class="modal shadow" style="display: none">
      <div class="modal-content">
        <div class="hover-div d-flex flex-end mb-3" @click="closeRePath()">
          <b-icon icon="x-circle-fill" class="close-modal" style="color: #e86154"></b-icon>
        </div>
        <div><h4 class="mb-3" style="color: black">추천경로</h4></div>
        <div ref="mapModal" style="width: 100%; height: 500px"></div>
        <div class="d-flex flex-row justify-content-center mt-3">
          <div v-for="(place, index) in fastPlaces" :key="index" class="d-flex flex-row">
            <h6 style="color: #3f72af">{{ place.name }}</h6>
            <b-icon icon="arrow-right-short" v-if="index !== fastPlaces.length - 1" class="mx-1" />
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
      modalClickLine: [],
      overlays: [],
      isHeart: false,
      isReShow: true, // 추천 경로 모달 창 flag
      mapModal: null,
      points: [],
      bounds: [],
      modalPoints: [],
      modalBounds: [],
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
        this.plan = data.plan;
        console.log("plan data :: ");
        console.log(data.plan);
        this.fastPlaces = data.fastPlaces;
        this.places = data.places;

        this.loadMarker(this.places);
        this.loadModalMarker(this.fastPlaces);
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.userInfo) {
      http
        .get(`/plan/good/${this.userInfo.userId}/${param}`, {
          headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
        })
        .then(({ data }) => {
          if (data.message === "success") {
            this.isHeart = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

        const container2 = this.$refs.mapModal;
        const options2 = {
          center: new window.kakao.maps.LatLng(37.500613, 127.036431),
          level: 5,
        };

        this.mapModal = new window.kakao.maps.Map(container2, options2);

        console.log(this.fastPlaces);
        this.loadModalMarker(this.fastPlaces);
      }
    },
    loadMarker(positions) {
      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      var len = positions.length;
      var lat = 0;
      var lng = 0;
      this.points = [];
      this.bounds = [];

      for (let i = 0; i < len; i++) {
        if (i == 0) {
          lat = positions[i].lat;
          lng = positions[i].lng;
        }
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        this.points.push(new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng));

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng), // 마커를 표시할 위치
          title: positions[i].place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

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
      this.bounds = new window.kakao.maps.LatLngBounds();

      this.points.forEach((p) => {
        this.bounds.extend(p);
      });

      this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));

      this.map.setBounds(this.bounds);
    },
    loadModalMarker(positions) {
      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      var len = positions.length;
      var lat = 0;
      var lng = 0;
      this.modalPoints = [];
      this.modalBounds = [];

      for (let i = 0; i < len; i++) {
        if (i == 0) {
          lat = positions[i].lat;
          lng = positions[i].lng;
        }
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        this.modalPoints.push(new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng));

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng), // 마커를 표시할 위치
          title: positions[i].place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.mapModal);

        var iwContent = `<div style="padding:5px;">${positions[i].name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwPosition = new window.kakao.maps.LatLng(positions[i].lat + 0.00035, positions[i].lng); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성하고 지도에 표시합니다
        new window.kakao.maps.InfoWindow({
          map: this.mapModal, // 인포윈도우가 표시될 지도
          position: iwPosition,
          content: iwContent,
        });

        // 선 생성
        this.drawModalLine(positions[i], i);
      }
      this.modalBounds = new window.kakao.maps.LatLngBounds();

      this.modalPoints.forEach((point) => {
        this.modalBounds.extend(point);
      });

      this.mapModal.setCenter(new window.kakao.maps.LatLng(lat, lng));

      this.mapModal.setBounds(this.modalBounds);
    },
    //커스텀 오버레이 표시 함수
    displayCustomOverlay(marker) {
      let content = `
		<div class="wrap">
			<div class="info">
				<div class="title">
					${marker.name}
					<div class="close" @click="closeOverlay()" title="닫기"></div>
				</div>
				<div class="body">
					<div class="img">
						<img src="${marker.imageUrl}" width="73" height="70">
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
    drawModalLine(position, index) {
      // console.log(position);
      var clickPosition = new window.kakao.maps.LatLng(position.lat, position.lng);

      if (index === 0) {
        this.modalClickLine = new window.kakao.maps.Polyline({
          map: this.mapModal,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: "#db4040",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
      } else {
        var path = this.modalClickLine.getPath();

        path.push(clickPosition);

        this.modalClickLine.setPath(path);

        var distance = Math.round(this.modalClickLine.getLength());
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
          .delete(`/plan/good/${this.userInfo.userId}/${this.plan.id}`, {
            headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
          })
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
          .post(`/plan/good`, goodPlan, {
            headers: { "X-ACCESS-TOKEN": "Bearer " + sessionStorage.getItem("refresh-token") },
          })
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
    /////////// 추천 경로 start ///////////
    showRePath() {
      this.isReShow = true;
    },
    closeRePath() {
      this.isReShow = false;
    },
    /////////// 추천 경로 end ///////////
  },
};
</script>

<style lang="scss">
.reco-path-custom {
  transition: all 0.2s linear;
}

.reco-path-custom:hover {
  cursor: pointer;
  transform: scale(1.2);
  color: #3f72af;
}

.reco-path-custom {
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

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

.timeline-custom {
  width: 400px;
  height: 150px;
  margin: 0 auto;
  position: relative;
}

.timeline-custom:hover {
  cursor: pointer;
  background-color: #dbe2ef;
}

.travel-info {
  width: 160px;
  position: absolute;
  right: 5px;
  left: 200px;
  top: 20px;
  bottom: 10px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 15px;
  width: 80%;
  max-width: 600px;
}

.close-modal:hover {
  cursor: pointer;
}

.place_name {
  color: #3f72af;
}

.btn {
  margin: 1rem;
  background-color: #4199ff;
  color: black;
  font-weight: 400;

  &-jelly {
    &:hover {
      animation: jelly 0.5s;
    }
  }
}

#modify-button {
  background-color: #4caf50;
}

@keyframes jelly {
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
