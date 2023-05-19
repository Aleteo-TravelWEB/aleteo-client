<template>
  <div id="answerbox">
    <div>답변 등록</div>
    <form id="answer" @submit="submit" class="form-flex">
      <input type="text" v-model="answer.content" class="input-field" />
      <b-button type="submit" variant="primary" class="m-1">등록</b-button>
    </form>
  </div>
</template>

<script>
import { writeAnswer } from "@/api/answer";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "AnswerWrite",
  data() {
    return {
      answer: {
        content: "",
        userId: "",
        boardId: "",
      },
    };
  },
  created() {
    console.log(this.$route.params.id);
    console.log(this.$route);
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    submit(event) {
      event.preventDefault();

      console.log(this.answer.content);
      if(!this.answer.content){
        alert("내용을 입력해주세요")
      }
      else{
        this.writeAnswer();
      }
      this.moveList();
    },
    writeAnswer() {
      let param = {
        content: this.answer.content,
        boardId: this.$route.params.id,
        userId: this.userInfo.userId,
      };
      console.log(param);
      writeAnswer(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생 했습니다.";
          if (data === "success") {
            msg = "등록 완료";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.go();
    }
  },
};
</script>

<style scoped>
#regist {
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px;
  border-radius: 20px;
}
.form-flex {
  display: flex;
  align-items: center;
}

.form-flex input {
  flex: 1;
  margin-right: 5px;
}

.input-field {
  flex: 1;
  border: 1px solid #ccc;
  padding: 5px;
  margin-right: 5px;
}
</style>
