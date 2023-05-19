<template>
  <div>
    <div>등록하러 왔어요</div>
    <input type="text" id="search-input" class="search-input" placeholder="검색어를 입력하세요" />
    <button id="search-button" class="search-button">검색</button>
  </div>
</template>

<script>

export default {
  name: 'HotplaceWrite',
  components: {
  },
  data() {
    return {
      keyword: "",
    };
  },
  created() {},
  methods: {
    search() {
      console.log(this.keyword);
    }
  },
};
</script>

<style scoped>
.search-input {
  border: 1px solid;
  border-radius: 3px;
  width: 200px;
  margin-right: 10px;
}
.search-button {
  border: 1px solid;
  border-radius: 3px;
  margin-right: 10px;
}
</style>