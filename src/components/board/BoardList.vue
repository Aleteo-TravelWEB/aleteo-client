<template>
  <div>
    <div>자유 게시판</div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>글 목록</h3></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-right">
          <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="boards" :fields="fields" @row-clicked="viewBoard">
            <template #cell(title)="data">
              <router-link :to="{ name: 'boardview', params: { id: data.item.id } }">
                {{ data.item.title }}
              </router-link>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { listBoard } from "@/api/board";

export default {
  name: "BoardList",
  components: {},
  props: {
    userId: String
  },
  data() {
    return {
      boards: [],
      fields: [
        { key: "id", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdClass" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
        { key: "createdAt", label: "작성일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 10,
      key: null,
      word: null,
    };
    listBoard(param, ({ data })=> {this.boards = data; console.log(data)}, (error)=>{console.log(error)});
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewBoard(board) {
      this.$router.push({
        name: "boardview",
        params: { id: board.id },
      });
    },
  },
};
</script>

<style scoped></style>
