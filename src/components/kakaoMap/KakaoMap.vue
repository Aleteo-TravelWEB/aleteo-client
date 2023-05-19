<template>
  <div>
    <div id="map" class="border rounded"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const attractionStore = "attractionStore";

export default {
  name: "KakaoMapVue",
  components: {},
  data() {
    return {
      map: null
    }
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  computed: {
    ...mapState(attractionStore, ["positions"])
  },
  watch: {
    positions: {
      handler() {
        if (window.kakao && window.kakao.maps && this.positions.length > 0) {
          this.loadMap();
        }
      },
      deep: true,
    }
  },
  methods: {
    ...mapMutations(attractionStore, ["CLEAR_POSITION_LIST"]),
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      script.onload = () => {
        this.CLEAR_POSITION_LIST();
        window.kakao.maps.load(this.loadMap);
      }

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 8
      };

      this.map = new window.kakao.maps.Map(container, options);
      if (this.positions.length > 0) this.loadMaker(this.positions);
    },
    // 지정한 위치에 마커 불러오기
    loadMaker(positions) {
      console.log("positions : " + positions);

      const imageSrc = require("@/assets/img/icon/location.png"); // 마커 이미지의 이미지 주소

      for (let i = 0; i < positions.length; i++) {
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng), // 마커를 표시할 위치
          title: positions[i].title, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        // 마커에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, 'click', () => {
          // this.makeMapUrl(positions[i]);
          this.displayCustomOverlay("", positions[i]);
        });
      }

      this.map.setCenter(new window.kakao.maps.LatLng(positions[0].lat, positions[0].lng));
    },
    //커스텀 오버레이 표시 함수
    displayCustomOverlay(mapUrl, marker) {
      console.log(mapUrl.length);
      let image = "";
      if (marker.image !== "") {
        image = marker.image;
      }
      else {
        image = require("@/assets/img/noimage.png");
      }

      let content = `
		<div class="wrap">
			<div class="info">
				<div class="title">
					${marker.title}
					<div class="close" @click="closeOverlay(this)" title="닫기"></div>
				</div>
				<div class="body">
					<div class="img">
    					<img src="${image}" width="73" height="70">
					</div>
					<div class="desc">
    					<div class="ellipsis mb-1">${marker.addr}</div>
    					<div class="jibun ellipsis">(우) ${marker.zipcode}</div>
    					<div class="mt-1">`;

      if (mapUrl !== "") {
        content += `<a href="${mapUrl}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-geo-alt me-1"></i>지도검색</a>`;
      }

      content += `<a href="https://map.kakao.com/link/to/${marker.title},${marker.lat},${marker.lng}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>   						
    					</div>
					</div>
				</div>
			</div>
		</div>
	`;

      var overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: new window.kakao.maps.LatLng(marker.lat, marker.lng)
      });

      overlay.setMap(this.map);
    },
    // 커스텀 오버레이를 닫는 함수
    closeOverlay(btn) {
      btn.parentNode.parentNode.parentNode.remove();
      // overlay.setMap(null);
    }
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}

.wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {width: 286px;height: 120px;border-radius: 6px; border: 1px solid #ccc; border-bottom: 2px solid #ddd;background-color:#fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-radius: 6px 6px 0px 0px; border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}
</style>
