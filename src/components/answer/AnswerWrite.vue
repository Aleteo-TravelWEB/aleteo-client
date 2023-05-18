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

export default {
  name: "AnswerWrite",
  data() {
    return {
      answer: {
        id: 0,
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
  methods: {
    submit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.writeAnswer();
    },
    writeAnswer() {
      let param = {
        content: this.answer.content,
        boardId: this.$route.params.id,
        userId: this.userInfo.userId,
      };
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
