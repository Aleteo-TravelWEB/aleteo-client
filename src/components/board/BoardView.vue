<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userId === board.userId">
        <b-button variant="outline-info" size="sm" @click="moveModifyBoard" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteBoard">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${board.id}.
          ${board.title}</h3><div><h6>${board.userName}</div><div>조회수 : ${board.hit}</div><div>${board.createdAt}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
      <answer-list></answer-list>
      <answer-write></answer-write>
  </b-container>
</template>

<script>
import { viewBoard } from "@/api/board";
import AnswerList from "@/components/answer/AnswerList";
import AnswerWrite from "@/components/answer/AnswerWrite";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: 'BoardView',
  components: { 
    AnswerList,
    AnswerWrite
  },
  data() {
    return {
      board: {},
      answers: [],
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if(this.board.content) return this.board.content.split("\n").join("<br>");
      return "";
    }
  },
  created() {
    let param = this.$route.params.id;
    console.log(param);
    viewBoard(
      param, 
      ({ data })=>{
        console.log(data);
        this.board = data;
      },
      (error) => {
        console.log(error);
      }
    );

  },
  methods: {
    moveList() {
      this.$router.push({name: "boardlist"});
    },
    moveModifyBoard() {
      this.$router.push({
        name: "boardmodify",
        params: { id: this.board.id },
      })
    },
    deleteBoard() {
      if(confirm("삭제 하시겠습니까?")) {
        this.$router.replace({
          name: "deleteboard",
          params: { id: this.board.id },
        })
      }
    }
  },
};
</script>

<style scoped></style>