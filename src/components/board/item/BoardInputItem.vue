<template>
  <div class="mb-1">
    <div style="text-align: left" class="d-flex justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" style="width: 800px;">
        <b-form-group id="title-group" label="글 제목" label-for="title" style="color: black">
          <b-form-input
            id="title"
            v-model="board.title"
            type="text"
            required
            placeholder="제목 입력..."
            class="shadow"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용" label-for="content" style="color: black">
          <b-form-textarea
            id="content"
            v-model="board.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            class="shadow"
            style="height: 500px;"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="image-group" label="사진" label-for="images" style="color: black">
          <b-form-file id="images" placeholder="파일 없음" v-model="board.image"></b-form-file>
        </b-form-group>

        <div class="d-flex flex-row mt-3">
        <button type="submit" class="m-1 btn btn-jelly" v-if="this.type === 'write'">글작성</button>
        <bbutton type="submit" class="m-1 btn btn-jelly" v-else>글수정</bbutton>
        <button type="reset" class="m-1 btn btn-jelly" style="background-color: #ff4141">초기화</button>
        <button @click="onMove()" class="m-1 btn btn-jelly" style="background-color: #f7f7f7">글목록</button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { writeBoard, modifyBoard, viewBoard } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";


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
  computed: {
    ...mapState(userStore, ["userInfo"]),
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
      // this.moveList();
    },
    onMove() {
      this.board.title = "";
      this.board.content = "";
      this.moveList();
    },
    writeBoard() {
      let param = {
        userId: this.userInfo.userId,
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