<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">

        <b-form-group id="title-group" label="제목:" label-for="title" description="제목을 입력하세요.">
          <b-form-input
            id="title"
            v-model="board.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="board.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'write'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeBoard, modifyBoard, viewBoard } from "@/api/board";

export default {
  name: 'BoardInputItem',
  data() {
    return {
      board: {
        user_id: "",
        title: "",
        content: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: {type: String},
    UserId: {type: String}
  },
  created() {
    if(this.type == "modify") {
      let param = this.$route.params.id;
      console.log(param);
      viewBoard(
        param,
        ({ data }) => {
          this.board = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.ifUserid = true;
    }
  },
  methods: {
    moveList() {
      this.$router.push({ name: "boardlist"});
    },
    onSubmit(event) {
      event.preventDefault();
      
      let err = true;
      let msg= "";
      !this.board.title && ((msg = "제목을 입력해주세요"), (err = false), this.$refs.titile.focus());
      err && !this.board.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());
      
      if(!err) alert(msg);
      else this.type === "write" ? this.writeBoard() : this.modifyBoard();
    },
    onReset(event) {
      event.preventDefault();

      this.board.title = "";
      this.board.content = "";
      this.moveList();
    },
    writeBoard() {
      let param = {
        userId:this.$store.state.UserId,
        title: this.board.title,
        content: this.board.content,
      };
      writeBoard(
        param,
        ({ data })=> {
          let msg = "등록 처리시 문제가 발생 했습니다.";
          if(data === "success") {
            msg = "등록 완료";
          }
          alert(msg);
          this.moveList();
        },
        (error) =>{
          console.log(error);
        }
      );
    },
    modifyBoard() {
      let param = {
        id: this.$route.params.id,
        title: this.board.title,
        content: this.board.content,
      };
      modifyBoard(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생 했습니다.";
          if(data === "success") {
            msg = "수정 완료";
          }
          alert(msg);
          this.moveList();
        },
        (error) =>{
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped></style>