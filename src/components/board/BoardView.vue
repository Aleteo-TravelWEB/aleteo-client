<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 style="color: black">
          {{ board.title }}
        </h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <button class="btn btn-jelly" @click="moveList" style="background-color: #f7f7f7">
          글목록
        </button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userId === board.userId">
        <button class="btn btn-jelly mr-2" @click="moveModifyBoard">글수정</button>
        <button class="btn btn-jelly" @click="deleteBoard" style="background-color: #ff4141">
          글삭제
        </button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<div><h6><strong>${board.userName}</strong></div><div>조회수 : ${board.hit}</div><div>${board.createdAt}</h6></div>`"
          class="mb-2 border rounded"
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
  name: "BoardView",
  components: {
    AnswerList,
    AnswerWrite,
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
      if (this.board.content) return this.board.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.id;
    console.log(param);
    viewBoard(
      param,
      ({ data }) => {
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
      this.$router.push({ name: "boardlist" });
    },
    moveModifyBoard() {
      this.$router.push({
        name: "boardmodify",
        params: { id: this.board.id },
      });
    },
    deleteBoard() {
      if (confirm("삭제 하시겠습니까?")) {
        this.$router.replace({
          name: "deleteboard",
          params: { id: this.board.id },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.btn {
  margin: 1rem;
  background-color: #4199ff;
  color: black;
  font-weight: 400;

  &-jelly {
    &:hover {
      animation: jelly 0.5s;
    }
  }
}

@keyframes jelly {
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
