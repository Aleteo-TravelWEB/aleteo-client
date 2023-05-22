<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div class="mt-3 mb-4">
          <h3 style="color: black">어디로 떠나볼까?</h3>
        </div>
      </b-col>
    </b-row>
    <b-row class="mb-5 border p-3 d-flex align-items-center" style="border-radius: 20px">
      <div class="mx-2" style="color: black">지금 바로 나만의 여행을 만들어 가볼까요</div>
      <b-col class="text-right buttons">
        <button
          class="btn-hover color-9"
          style="width: 400px"
          variant="outline-prim"
          @click="moveWrite()"
        >
          여행 계획 세우기
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mb-3">
        <b-table
          hover
          :items="plans"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          @row-clicked="viewPlan"
          class="table-hover"
        >
          <template #cell(index)="data">{{
            plans.length - data.index - (currentPage - 1) * perPage
          }}</template>
        </b-table>
      </b-col>
    </b-row>
    <div class="mb-5">
      <b-pagination
        pills
        v-model="currentPage"
        :total-rows="plans.length"
        :per-page="perPage"
        align="center"
        class="mt-4"
      />
    </div>
  </b-container>
</template>

<script>
import { listPlan } from "@/api/plan";
import { mapGetters } from "vuex";

const userStore = "userStore";

export default {
  name: "PlanList",
  components: {},
  data() {
    return {
      plans: [],
      fields: [
        { key: "index", label: "NO", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "createdAt", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      currentPage: 1,
      perPage: 9,
    };
  },
  computed: {
    ...mapGetters(userStore, ["checkToken"]),
    pagination() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.plans.slice(startIndex, endIndex);
    },
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listPlan(
      param,
      ({ data }) => {
        console.log("data : " + data);
        this.plans = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "planwrite" });
    },
    viewPlan(plan) {
      this.$router.push({
        name: "planview",
        params: { planId: plan.id },
      });
    },
  },
};
</script>

<style lang="scss">
.buttons {
  text-align: center;
}

.btn-hover {
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 50px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 20px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-9 {
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
$primary-color: #008cba;
$gray-color: #ddd;
$medium-up: 600px;
$large-up: 1000px;
$global-radius: 4px;

@mixin heading-font-regular {
  font-family: "Helvetica", "Helvetica Neue", "Arial", sans-serif;
}

.table-hover:hover {
  cursor: pointer;
}
</style>
