<template>
  <b-container class="box mb-4">
    <b-row class="mt-4 mb-2 p-3 text-center">
      <b-col class="sm-4">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
      </b-col>
      <b-col class="sm-4">
        <b-form-select v-model="gugunCode" :options="guguns"></b-form-select>
      </b-col>
    </b-row>
    <b-row class="mt-4 mb-4 p-4 justify-content-md-center">
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" :value="toggleOn" @change="selectAll">
          <label class="custom-control-label" for="customSwitch1">전체 선택</label>
        </div> 
        <b-form-checkbox class="m-1"
          v-for="(type, index) in types" :key="index"
          v-model="contentTypeIds" :value="type.id" :id="String(type.id)" :name="type.name" @change="selectType">
          {{ type.name }}
        </b-form-checkbox>
    </b-row>
    <kakao-map-vue class="mb-4 p-3"></kakao-map-vue>
  </b-container>
</template>

<script> 
import { mapState, mapActions, mapMutations } from "vuex";
import KakaoMapVue from '@/components/kakaoMap/KakaoMap.vue';

const attractionStore = "attractionStore";

export default {
  name: "AttractionSearchBar",
  components: {
    KakaoMapVue,
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      contentTypeIds: [],
      toggleOn: false, 
    };
  },
  computed: {
    ...mapState(attractionStore, ["sidos", "guguns", "types", "checkedTypes", "attractions"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_ATTRACTION_LIST();
    this.getSido();
  },
  watch: {
    contentTypeIds(newIds) {
      if (newIds.length == 0) {
        this.CLEAR_POSITION_LIST();
        window.kakao.maps.load(this.loadMap);
      }
    }
  },
  methods: {
    ...mapActions(attractionStore, ["getSido", "getGugun", "getType", "getTypeList", "getAttractionList"]),
    ...mapMutations(attractionStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_TYPE_LIST", "CLEAR_ATTRACTION_LIST", "CLEAR_POSITION_LIST"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    selectType(checked) {
      this.CLEAR_TYPE_LIST();
      this.CLEAR_POSITION_LIST();
      if (checked) this.getType(this.contentTypeIds);
      if (this.sidoCode && this.gugunCode) this.getAttractionList([this.sidoCode, this.gugunCode, this.contentTypeIds]);
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
        level: 8
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
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
</style> 