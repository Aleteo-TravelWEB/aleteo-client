<template>
  <b-container>
    <b-row class="mt-4 mb-4 text-center">
      <!-- <b-col class="sm-3">
        <b-form-input
          v-model.trim="dongCode"
          placeholder="동코드 입력...(예 : 11110)"
          @keypress.enter="sendKeyword"
        ></b-form-input>
      </b-col>
      <b-col class="sm-3" align="left">
        <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
      </b-col> -->
      <b-col class="sm-4">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
      </b-col>
      <b-col class="sm-4">
        <b-form-select v-model="gugunCode" :options="guguns" @change="searchAttr"></b-form-select>
      </b-col>
    </b-row>
    <b-row class="mt-4 mb-4 p-4">
        <b-form-checkbox class="m-1"
          v-for="(type, index) in types" :key="index"
          v-model="checkedTypes" :value="type.id" :id="String(type.id)" :name="type.name">
          {{ type.name }}
        </b-form-checkbox>
    </b-row>
  </b-container>
</template>

<script> 
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "AttractionSearchBar",
  components: {},
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      types: [
        { id: 0, name: "전체 보여주기"},
        { id: 12, name: '관광지' },
        { id: 14, name: '문화시설' },
        { id: 15, name: '축제공연행사' },
        { id: 25, name: '여행코스' },
        { id: 28, name: '레포츠' },
        { id: 32, name: '숙박' },
        { id: 38, name: '쇼핑' },
        { id: 39, name: '음식점' }
      ],
      checkedTypes: [] // 선택된 체크박스 값들이 저장될 배열
    };
  },
  computed: {
    ...mapState(["sidos", "guguns"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_ATTRACTION_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getAttractionList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_ATTRACTION_LIST"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchAttr() {
      // console.log(this.sidoCode + ", " + this.gugunCode)
      if (this.sidoCode && this.gugunCode) this.getAttractionList([this.sidoCode, this.gugunCode]);
    },
  },
};
</script>

<style scoped></style>