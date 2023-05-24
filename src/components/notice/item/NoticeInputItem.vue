<template>
  <div class="mb-1">
    <div style="text-align: left" class="d-flex justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" style="width: 800px;">
        <b-checkbox v-model="isPin" @change="selectPin" class="d-flex flex-row justify-content-end" style="color: black;">상단고정</b-checkbox>
        <b-form-group id="title-group" label="글 제목" label-for="title" style="color: black">
          <b-form-input
            id="title"
            v-model="notice.title"
            type="text"
            required
            placeholder="제목 입력..."
            class="shadow"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용" label-for="content" style="color: black">
          <b-form-textarea
            id="content"
            v-model="notice.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            class="shadow"
            style="height: 500px;"
          ></b-form-textarea>
        </b-form-group>

        <div class="d-flex flex-row mt-3">
        <button type="submit" class="m-1 btn btn-jelly" v-if="this.type === 'write'">글작성</button>
        <button type="submit" class="m-1 btn btn-jelly" v-else>글수정</button>
        <button type="reset" class="m-1 btn btn-jelly" style="background-color: #ff4141">초기화</button>
        <button @click="onMove()" class="m-1 btn btn-jelly" style="background-color: #f7f7f7">글목록</button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { writeNotice, modifyNotice, viewNotice } from "@/api/notice";

export default {
  name: 'NoticeInputItem',
  data() {
    return {
      notice: {
        user_id: "",
        title: "",
        content: "",
        pin: 0,
      },
      isUserid: false,
      isPin: false,
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
      viewNotice(
        param,
        ({ data }) => {
          this.notice = data;
          if (this.notice.pin > 0) this.isPin = true;
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
      this.$router.push({ name: "noticelist"});
    },
    selectPin(checked) {
      console.log("checked :: " + checked);
      if (checked) this.notice.pin = 2;
      else this.notice.pin = 0;
      console.log(this.notice.pin);
    },
    onSubmit(event) {
      event.preventDefault();
      
      let err = true;
      let msg= "";
      console.log("submit :: " + this.notice.pin);
      !this.notice.title && ((msg = "제목을 입력해주세요"), (err = false), this.$refs.titile.focus());
      err && !this.notice.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());
      
      if(!err) alert(msg);
      else this.type === "write" ? this.writeNotice() : this.modifyNotice();
    },
    onReset(event) {
      event.preventDefault();

      this.notice.title = "";
      this.notice.content = "";
      // this.moveList();
    },
    onMove() {
      this.notice.title = "";
      this.notice.content = "";
      this.moveList();
    },
    writeNotice() {
      let param = {
        userId:this.$store.state.UserId,
        title: this.notice.title,
        content: this.notice.content,
        pin: this.notice.pin,
      };
      writeNotice(
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
    modifyNotice() {
      let param = {
        id: this.$route.params.id,
        title: this.notice.title,
        content: this.notice.content,
        pin: this.notice.pin,
      };
      modifyNotice(
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