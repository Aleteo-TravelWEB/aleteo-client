<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <div class="mt-3 mb-4"><h3 style="color: black">여행해 듀오</h3></div>
        </b-col>
      </b-row>
      <b-row class="mb-5 border p-3 d-flex align-items-center" style="border-radius: 20px">
      <div class="mx-2" style="color: black">두근두근 설레는 여행을 떠나보자</div>
      <b-col class="text-right buttons">
        <button
          class="btn-hover color-9"
          style="width: 400px"
          variant="outline-prim"
          @click="moveWrite()"
        >
          나만의 팁 공유하기
        </button>
      </b-col>
    </b-row>
      <b-row>
        <b-col>
          <b-table
            id="list"
            hover
            :items="boards"
            :per-page="perpage"
            :current-page="currentPage"
            :fields="fields"
            @row-clicked="viewBoard"
            class="table-hover"
          >
            <template #cell(index)="data">
              {{ boards.length - data.index - (currentPage - 1) * perpage }}
            </template>
            <template #cell(title)="data">
              <router-link :to="{ name: 'boardview', params: { id: data.item.id } }" class="link">
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
        // { key: "id", label: "글번호", tdClass: "tdClass" },
        { key: "index", label: "NO", tdClass: "tdClass" },
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

.buttons {
  text-align: center;
}

.btn-hover {
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 50px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 20px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-9 {
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.table-hover:hover {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
