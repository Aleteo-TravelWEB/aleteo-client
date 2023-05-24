<template>
  <div class="container">
    <div class="mb-5 mt-5">
      <h4 style="color: black;">비밀번호 확인</h4>
    </div>
    <div class="mb-4">
        <label class="mb-1 text-secondary" for="userPwd">password</label>
      <br>
      <div class="d-flex justify-content-center">
        <b-form-input placeholder="비밀번호를 입력해주세요" type="password" class="form-control" name="userPwd" id="userPwd" v-model="userPwd" :state="pwdCheck"></b-form-input>
      </div>
    </div>
    <div class="mb-5">
      <button type="submit" class="m-1 btn btn-jelly" @click="confirmPw">확인</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { confirmPwd } from "@/api/user";

const userStore = "userStore";

export default {
  name: 'UserPwconfirm',
  components: {},
  data() {
    return {
      userPwd: null,
      pwdCheck: null,
    };
  },
  created() {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    async confirmPw() {
      const user = {
        userId: this.userInfo.userId,
        userPwd: this.userPwd,
      }
      await confirmPwd(
        user,
        ({data}) => {
          if (data.message === "success") {
            // console.log("비밀번호 확인 완료");
            this.$router.push( {name : "modify"});
          } else {
            // console.log("비밀번호 확인 실패");
            this.pwdCheck = false;
          }
        },
        async (error) => {
          console.log(error);
        }
      );
    }
  },
};
</script>

<style scoped>
.form-control {
  width: 200px;
}
</style>

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