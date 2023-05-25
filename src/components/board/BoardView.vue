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
          class="mb-2 border rounded cardbody w-5"
          no-body
        >
          <b-card-body v-if="board.image !== null" class="image-container">
            <img  class="imgage" :src="`/upload/hotplace/image/${board.image}`" style="width:100%; height:auto; max-height:100%">
            <div @click="openModal(board)"><u>이미지 상세보기</u></div>
          </b-card-body>
          <hr>
          <b-card-body class="text-left">
              <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        댓글 목록
      </b-col>
    </b-row>
    <answer-list></answer-list>
    <answer-write></answer-write>

    <!-- 이미지 모달창 -->
    <div id="myModal" class="modal">
      <span class="close" @click="closeModal()">&times;</span>
      <img class="modal-content" id="modalImage">
    </div>
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
      showModal: false,
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
    openModal(board) {
      document.getElementById('myModal').style.display = 'block';
      document.getElementById('modalImage').src =`/upload/hotplace/image/${board.image}`;
    },
    // 모달 닫기
    closeModal() {
      document.getElementById('myModal').style.display = 'none';
    }
  },
};
</script>


<style lang=scss scoped>
.card {
  width:95% !important;
}

.card:hover {
  transform: none;
}
.image {
  height: auto;
  max-width: 100%;
}

.image-container {
  padding: 0px;
}

/* 이미지 모달창 */
.modal {
  display: none;
  position: fixed;
  z-index: 9999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

.modal img {
  width: 100%;
  height: auto;
}

.close {
  cursor: pointer;
  font-size: 90px; /* 원하는 크기로 조정합니다 */
  line-height: 1; /* 텍스트의 수직 정렬을 조정합니다 */
  }

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
