<template>
    <div>
        <div>공지 사항</div><b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
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
          <template #cell(subject)="data">
            <router-link :to="{ name: 'boardview', params: { boardNo: data.item.boardNo } }">
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
import http from "@/api/http";

export default {
  name: "BoardList",
  components: {
    
  },
  data() {
    return {
			boards: [],
			fields: [
				{ key: "id", label: "글번호", tdClass: "tdClass"},
				{ key: "title", label: "제목", tdClass: "tdClass"},
				{ key: "user_id", label: "작성자", tdClass: "tdClass"},
				{ key: "hit", label: "조회수", tdClass: "tdClass"}, 
				{ key: "created_at", label: "작성일", tdClass: "tdClass"},
			],
		};
	},
  created() {
    http.get(`/board/list`).then((data) => {
			console.log("get board call");
			console.log(data);
		})
  },
  methods: {
		moveWrite() {
			this.$router.push({name: "boardwrite"});
		},
		viewBoard(board) {
			this.$router.push({
				name: "boardview",
				params: { id: board.id },
			})
		}
	},
};
</script>

<style scoped></style>