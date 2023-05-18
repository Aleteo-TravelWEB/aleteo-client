<template>
<!-- 알았으니까
이제 b-어쩌구 있는거면
뭔지 제대로 알고 사용을 하셔야합니다.
-->
  <div id="container">
    <div>댓글 목록</div>
      <div v-for="answer in answers" :key="answer.id">
        <b-card class="col-12">
          <b-card-text>{{ answer.content }}</b-card-text>
        </b-card>
      </div>
    </div>
</template>

<script>
import { listAnswer } from "@/api/answer";

export default {
  name: 'AnswerList',
  data() {
    return {
      answers: []
    };
  },
  created() {
    let param = this.$route.params.id;
    console.log(param);
    listAnswer(
      param,
      ({data}) => {
        console.log(data);
        this.answers = data;
      },
      (error) => {
        console.log(error);
      }
    )
  },
  methods: {},
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
</style>