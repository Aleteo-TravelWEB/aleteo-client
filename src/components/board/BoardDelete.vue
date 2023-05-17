<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deleteBoard } from "@/api/board";

export default {
  name: 'BoardDelete',
  components: {},
  data() {
    return {
      message: '',
    };
  },
  created() {
    let param = this.$route.params.id;
    deleteBoard(
      param,
      ({ data })=>{
        let msg = "삭제시 문제 발생";
        if(data === "success") {
          msg = "삭제 완료!";
        }
        alert(msg);
        this.$router.push({ name: "boardlist" });
      },
      (error) => {
        console.log(error);
      }
    )
  },
  methods: {},
};
</script>

<style scoped></style>