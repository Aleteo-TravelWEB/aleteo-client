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
          <b-table
            id="list"
            striped
            hover
            :items="boards"
            :per-page="perpage"
            :current-page="currentPage"
            :fields="fields"
            @row-clicked="viewBoard"
          >
            <template #cell(title)="data">
              <router-link :to="{ name: 'boardview', params: { id: data.item.id } }">
                {{ data.item.title }}
              </router-link>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-pagination
        pills
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perpage"
        aria-controls="list"
        align="center"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import { listBoard } from "@/api/board";

export default {
  name: "BoardList",
  components: {},
  props: {
    userId: String,
  },
  data() {
    return {
      boards: [],
      currentPage: 1,
      perpage: 10,
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
      pg: 1, // 현재 페이지 번호
      spp: 10, // 페이지당 글 개수
      key: null,
      word: null,
    };
    listBoard(
      param,
      ({ data }) => {
        this.boards = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    rows() {
      return this.boards.length;
    },
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

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
