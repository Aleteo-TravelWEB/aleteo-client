<template>
  <div id="answerbox">
    <div>답변 등록</div>
    <form id="answer" @submit="submit" class="form-flex">
      <input type="text" v-model="answer.content" class="input-field">
      <b-button type="submit" variant="primary" class="m-1">등록</b-button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'AnswerWrite',
  data() {
    return {
      answer: {
        id: 0,
        content: "",
        userId: "",
        boardId: this.$route.params.id,
      }
    };
  },
  created() {
    console.log(this.$route.params.id);
    
  },
  methods: { 
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