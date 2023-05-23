<template>
  <b-container class="bv-example-row mt-3">
    <div class="d-flex justify-content-center mb-3 mt-5">
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </b-container>
</template>

<script>
import { deleteNotice } from "@/api/notice";

export default {
  name: "NoticeDelete",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {
    let param = this.$route.params.id;
    deleteNotice(
      param,
      ({ data }) => {
        let msg = "삭제시 문제 발생";
        if (data === "success") {
          msg = "삭제 완료!";
        }
        alert(msg);
        this.$router.push({ name: "noticelist" });
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {},
};
</script>

<style scoped></style>
