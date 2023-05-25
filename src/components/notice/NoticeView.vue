<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 style="color: black;">
          {{notice.title}}</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <button class="btn btn-jelly" @click="moveList" style="background-color: #f7f7f7">글목록</button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userId === notice.userId">
        <button class="btn btn-jelly mr-2" @click="moveModifyNotice">글수정</button>
        <button class="btn btn-jelly" @click="deleteNotice" style="background-color: #ff4141">글삭제</button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<div><h6><strong>${notice.userName}</strong></div><div>조회수 : ${notice.hit}</div><div>${notice.createdAt}</h6></div>`"
          class="mb-2 border rounded"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { viewNotice } from "@/api/notice";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: 'NoticeView',
  components: { 
  },
  data() {
    return {
      notice: {},
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if(this.notice.content) return this.notice.content.split("\n").join("<br>");
      return "";
    }
  },
  created() {
    let param = this.$route.params.id;
    console.log(param);
    viewNotice(
      param, 
      ({ data })=>{
        console.log(data);
        this.notice = data;
      },
      (error) => {
        console.log(error);
      }
    );

  },
  methods: {
    moveList() {
      this.$router.push({name: "noticelist"});
    },
    moveModifyNotice() {
      this.$router.push({
        name: "noticemodify",
        params: { id: this.notice.id },
      })
    },
    deleteNotice() {
      if(confirm("삭제 하시겠습니까?")) {
        this.$router.replace({
          name: "deletenotice",
          params: { id: this.notice.id },
        })
      }
    }
  },
};
</script>

<style lang="scss">

.card {
  width:95% !important;
}


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

.card:hover {
  transform: none;
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
}</style>