<template>
  <b-container class="box mb-4">
    <div class="mt-4">
      <h2>여기어때?</h2>
    </div>
    <b-row class="mt-4 mb-2 p-3 text-center">
      <b-col class="sm-4">
        <b-form-select
          class="search"
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-4">
        <b-form-select class="search" v-model="gugunCode" :options="guguns"></b-form-select>
      </b-col>
    </b-row>
    <div
      class="border mt-2 mb-4 p-4 d-flex justify-content-md-center control"
      style="border-radius: 20px"
    >
      <div class="custom-switch d-flex align-items-center mx-1">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
          :value="toggleOn"
          @change="selectAll"
        />
        <label class="custom-control-label" for="customSwitch1">전체 선택</label>
      </div>
      <b-form-checkbox
        class="m-1"
        v-for="(type, index) in types"
        :key="index"
        v-model="contentTypeIds"
        :value="type.id"
        :id="String(type.id)"
        :name="type.name"
        @change="selectType"
      >
        {{ type.name }}
      </b-form-checkbox>
    </div>
    <div>
      <button v-if="isSearch" @click="showModal()" class="rounded p-1 mb-2 hover shadow" style="border: 1px solid gray"><Strong style="color: #3f72af">{{clicks.title}}</Strong> 자세히 보기</button>
    </div>
    <kakao-map-vue class="mb-4 p-3"></kakao-map-vue>
    
    <!-- 모달창 -->
    <div v-if="show" class="modal shadow mb-5">
      <div class="modal-content container">
        <div class="hover-div d-flex flex-end mb-3" @click="closeModal()">
          <b-icon icon="x-circle-fill" style="color: #e86154"></b-icon>
        </div>
        <h4 class="text-secondary mb-3">
          <b-icon icon="clipboard-check"></b-icon> <strong>{{ clicks.title }}</strong>
        </h4>
        <div>
          <div>
            <img :src="clicks.first_image" :alt="clicks.title" style="width: 500px;">
          </div>
          <div>
            <div><span>{{clicks.addr1}}</span></div>
            <div>
              <p>{{clicks.zipcode}}</p>
              <p v-if="clicks.tel !== null">{{clicks.tel}}</p>
            </div>
            <div>
              <p>{{clicks.overview}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import KakaoMapVue from "@/components/kakaoMap/KakaoMap.vue";

const attractionStore = "attractionStore";

export default {
  name: "AppAttraction",
  components: {
    KakaoMapVue,
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      contentTypeIds: [],
      toggleOn: false,
      show: false,
      clickAttr: [],
    };
  },
  computed: {
    ...mapState(attractionStore, ["sidos", "guguns", "types", "checkedTypes", "attractions", "clicks", "isSearch"]),
    ...mapGetters(attractionStore, ["getClicks"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_ATTRACTION_LIST();
    this.CLEAR_CLICK_LIST();
    this.CLEAR_IS_SEARCH();
    this.getSido();
  },
  watch: {
    contentTypeIds(newIds) {
      if (newIds.length == 0) {
        this.CLEAR_POSITION_LIST();
        this.CLEAR_IS_SEARCH();
        window.kakao.maps.load(this.loadMap);
      }
    },
  },
  methods: {
    ...mapActions(attractionStore, [
      "getSido",
      "getGugun",
      "getType",
      "getTypeList",
      "getAttractionList",
    ]),
    ...mapMutations(attractionStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_TYPE_LIST",
      "CLEAR_ATTRACTION_LIST",
      "CLEAR_POSITION_LIST",
      "CLEAR_CLICK_LIST",
      "CLEAR_IS_SEARCH",
    ]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    selectType(checked) {
      this.CLEAR_TYPE_LIST();
      this.CLEAR_POSITION_LIST();
      if (checked) this.getType(this.contentTypeIds);
      if (this.sidoCode && this.gugunCode)
        this.getAttractionList([this.sidoCode, this.gugunCode, this.contentTypeIds]);
    },
    selectAll() {
      this.CLEAR_TYPE_LIST();
      this.CLEAR_POSITION_LIST();
      this.contentTypeIds = [];
      let toggleValue = this.toggleOn;
      this.toggleOn = !toggleValue;
      if (this.sidoCode && this.gugunCode && this.toggleOn) {
        this.getTypeList();
        this.contentTypeIds = this.types.map((type) => type.id);
        this.getAttractionList([this.sidoCode, this.gugunCode, this.contentTypeIds]);
      }
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: 8,
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
    // 관광지 결과 보여주기
    showModal() {
      // 모달창 띄우기
      this.show = true;
      this.clickAttr = this.getClicks;
    },
    closeModal() {
      this.show = false;
    }
  },
};
</script>

<style scoped>
* {
  color: black;
}

.box::after {
  background-color: whitesmoke;
  border-radius: 3%;
  opacity: 0.5;
}
.search {
  border: 1px solid black;
  color: black;
}

.search:hover {
  cursor: pointer;
  border: 2px groove #789dca;
  color: #0d3668;
}

.modal {
  display: block;
  position: fixed;
  z-index: 10000;
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
  border-radius: 15px;
  width: 70%;
  max-width: 600px;
}

.hover:hover {
  background: #cfcfcf;
}
</style>
