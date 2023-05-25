<template>
  <div id="container">
    <div v-for="(answer, index) in answers" :key="index">
      <!-- 답변 리스트 -->
      <div class="delete-button-wrapper" v-if="userInfo.userId===answer.userId">
        <div class="answercontent">
        <div class="icon-container">
          <p class="h4 mb-2">
            <b-icon
              icon="trash"
              variant="danger"
              @click="deleteAnswer(answer.id)"
            ></b-icon>
          </p>
          <p class="h4 mb-2 icon">
            <b-icon
              icon="chat-dots"
              variant="success"
              @click="showModal(index)"
            ></b-icon>
          </p>
        </div>
        {{ answer.content }}
      </div>
    </div>

      <!-- 입력 모달 창 -->
      <b-modal v-model="modalVisible[index].visible" :key="answer.id">
        <form @submit.stop.prevent="handleOk">
          <input type="text" v-model="updatedContent[index]" class="inputbox"/>
        </form>
        <template #modal-footer>
          <b-button variant="secondary" @click="handleCancel(index)">취소</b-button>
          <b-button variant="primary" @click="updateAnswer(answer.id, index)">수정</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { listAnswer, deleteAnswer, modifyAnswer } from "@/api/answer";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "AnswerList",
  data() {
    return {
      answers: [],
      modalVisible: [],
      updatedContent: [],
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    let param = this.$route.params.id;
    listAnswer(
      param,
      ({ data }) => {
        this.answers = data;
        this.modalVisible = data.map(() => ({
          visible: false,
          content: "",
        }));
        this.updatedContent = new Array(data.length).fill("");
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    showModal(index) {
      this.modalVisible[index].visible = true;
      this.updatedContent[index] = this.answers[index].content;
      console.log(this.modalVisible[index]);
      console.log(this.updatedContent[index]);
      console.log("indez=" + index);
    },
    handleOk(index) {
      // 모달 확인 버튼 클릭 시 동작
      this.modalVisible[index].visible = false;
    },
    handleCancel(index) {
      // 모달 취소 버튼 클릭 시 동작
      this.modalVisible[index].visible = false;
    },
    updateAnswer(answerId, index) {
      // 수정 버튼 클릭 시 동작
      this.modalVisible[index].visible = false;
      let param = {
        id: answerId,
        content: this.updatedContent[index],
      }
      modifyAnswer(
        param,
        ({ data }) => {
          let msg = "예상치 못한 에러 발생";
          if (data === "success") {
            msg = "수정 완료";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
      this.moveList();
    },
    deleteAnswer(answerId) {
      // 삭제 버튼 클릭 시 동작
      if (confirm("정말 삭제하시겠습니까?")) {
        deleteAnswer(
          answerId,
          ({ data }) => {
            let msg = "예상치 못한 에러 발생";
            if (data === "success") {
              msg = "삭제 완료";
            }
            alert(msg);
          },
          (error) => {
            console.log(error);
          }
        )
        this.moveList();
      }
    },
    moveList() {
      this.$router.go();
    }
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
}

.answercontent {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  /* padding: 2rem; */
}

.icon-container {
  display: flex;
  flex-direction: row-reverse;
  
}


/* .styled-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
} */

.inputbox {
  width: 200px; /* 원하는 너비로 설정 */
  height: 40px; /* 원하는 높이로 설정 */
  border: 1px solid #ccc;
  padding: 8px;
}
</style>