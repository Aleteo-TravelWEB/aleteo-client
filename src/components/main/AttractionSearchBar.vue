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
      contentTypeIds: [],
      toggleOn: false, 
    };
  },
  computed: {
    ...mapState(["sidos", "guguns", "types", "checkedTypes", "attractions"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_ATTRACTION_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getType", "getTypeList", "getAttractionList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_TYPE_LIST", "CLEAR_ATTRACTION_LIST"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    selectType(checked) {
      this.CLEAR_TYPE_LIST();
      if (checked) this.getType(this.contentTypeIds);
    },
    selectAll() {
      this.CLEAR_TYPE_LIST();
      this.contentTypeIds = [];
      let toggleValue = this.toggleOn;
      this.toggleOn = !toggleValue;
      if (this.toggleOn) {
        this.getTypeList();
        this.contentTypeIds = this.types.map((type) => type.id);
      }
    },
    searchAttr() {
      // console.log(this.sidoCode + ", " + this.gugunCode)
      if (this.sidoCode && this.gugunCode) this.getAttractionList([this.sidoCode, this.gugunCode]);
    },
  },
};
</script>

<style scoped></style> 