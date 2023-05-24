<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron bg-variant="white">
          <template><div class="header">My Page</div></template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row class="row-margin">
              <b-col cols="3" align-self="end"><strong>아이디</strong></b-col>
              <b-col cols="7" align-self="start">{{ userInfo.userId }}</b-col>
            </b-row>
            <b-row class="row-margin">
              <b-col cols="3" align-self="end"><strong>이름</strong></b-col>
              <b-col cols="7" align-self="start">{{ userInfo.userName }}</b-col>
            </b-row>
            <b-row class="row-margin">
              <b-col cols="3" align-self="end"><strong>이메일</strong></b-col>
              <b-col cols="7" align-self="start"
                >{{ userInfo.emailId }}@{{ userInfo.emailDomain }}</b-col
              >
            </b-row>
            <!-- <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col><b-col cols="4" align-self="start">{{
                userInfo.joindate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row> -->
          </b-container>
          <hr class="my-4" />

          <div class="d-flex flex-row justify-content-around">
            <div class="mb-3">
              <b-icon
                icon="bookmark-heart"
                font-scale="6"
                class="mb-2 plan-icon"
                @click="showGoodPlans()"
              />
              <div>좋아요한 여행들</div>
            </div>

            <div class="mb-3">
              <b-icon
                icon="hash"
                font-scale="6"
                class="mb-2 plan-icon"
                @click="showGoodHotplaces()"
              />
              <div>좋아요한 핫플레이스들</div>
            </div>
          </div>

          <hr />
          
          <button type="submit" class="m-1 mx-2 btn btn-jelly" ><router-link :to="{ name: 'pwconfirm' }" class="link">내정보수정</router-link></button>
          <button type="submit" class="m-1 mx-2 btn btn-jelly" @click="resignUser" style="background-color: #ff4141">탈퇴하기</button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
    <!-- 여행 계획 좋아요 모달 start -->
    <div class="modal" v-if="isShowPlanModal">
      <div class="modal-content container">
        <div class="hover-div d-flex flex-end mb-3 hover-event" @click="closePlanModal()">
          <b-icon icon="x-circle-fill" style="color: #e86154"></b-icon>
        </div>
        <div v-if="goodPlans.length !== null && goodPlans.length !== 0">
          <b-table hover :items="goodPlans" :fields="fields" @row-clicked="viewPlan">
            <template #cell(index)="data">{{ data.index + 1 }}</template>
          </b-table>
        </div>
        <div v-else>
          <p>아직 좋아요한 게시글이 없습니다</p>
        </div>
      </div>
    </div>
    <!-- 여행 계획 좋아요 모달 end -->
    <!-- 핫플레이스 좋아요 모달 start -->
    <div class="modal" v-if="isShowHotplaceModal">
      <div class="modal-content container">
        <div class="hover-div d-flex flex-end mb-3 hover-event" @click="closeHotplaceModal()">
          <b-icon icon="x-circle-fill" style="color: #e86154"></b-icon>
        </div>
        <div v-if="goodHotplaces.length !== null && goodHotplaces.length !== 0">
          <b-table
            hover
            :items="goodHotplaces"
            :fields="hotplaceFields"
            @row-clicked="viewHotplace"
          >
            <template #cell(index)="data">{{ data.index + 1 }}</template>
          </b-table>
        </div>
        <div v-else>
          <p>아직 좋아요한 게시글이 없습니다</p>
        </div>
      </div>
    </div>
    <!-- 핫플레이스 좋아요 모달 end -->
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { viewGoodPlan } from "@/api/plan";
import { viewGoodHotplace } from "@/api/hotplace";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  components: {},
  data() {
    return {
      isShowPlanModal: false,
      isShowHotplaceModal: false,
      goodPlans: [], // 좋아요한 여행 계획들 담는 배열
      goodHotplaces: [], // 좋아요한 핫플레이스들 담는 배열
      fields: [
        { key: "index", label: "NO", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "createdAt", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      hotplaceFields: [
        { key: "index", label: "NO", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "tag1", label: "#", tdClass: "tdClass" },
        { key: "tag2", label: "#", tdClass: "tdClass" },
        { key: "joinDate", label: "작성일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    const userId = this.userInfo.userId;
    viewGoodPlan(
      userId,
      ({ data }) => {
        console.log("good plan data:: ");
        console.log(data);
        this.goodPlans = data;
      },
      (error) => {
        console.log(error);
      }
    );
    viewGoodHotplace(
      userId,
      ({ data }) => {
        console.log("good hotplace data :: ");
        console.log(data);
        this.goodHotplaces = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(userStore, ["userInfo", "isResign"]),
  },
  methods: {
    ...mapActions(userStore, ["userResign"]),
    async resignUser() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        await this.userResign(this.userInfo.userId);
        sessionStorage.removeItem("access-token"); // 저장된 토큰 없애기
        sessionStorage.removeItem("refresh-token");
        if (this.$route.path != "/") this.$router.push({ name: "main" });
      }
    },
    showGoodPlans() {
      this.isShowPlanModal = true;
    },
    showGoodHotplaces() {
      this.isShowHotplaceModal = true;
    },
    closePlanModal() {
      this.isShowPlanModal = false;
    },
    closeHotplaceModal() {
      this.isShowHotplaceModal = false;
    },
    viewPlan(plan) {
      this.$router.push({ name: "planview", params: { planId: plan.id } });
    },
    viewHotplace(hotplace) {
      this.$router.push({ name: "hotplacelist", params: { hotplaceId: hotplace.id } });
    },
  },
};
</script>

<style scoped>
.link {
  color: black;
  text-decoration: none;
}

.header {
  font-size: xx-large;
}

.row-margin {
  margin: 10px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 15px;
  width: 70%;
  max-width: 800px;
}

.plan-icon {
  transition: all 0.2s linear;
}

.plan-icon:hover {
  cursor: pointer;
  transform: scale(1.2);
  color: #e86154;
}

.hover-event:hover {
  cursor: pointer;
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
