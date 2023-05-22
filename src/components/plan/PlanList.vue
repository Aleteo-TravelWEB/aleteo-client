<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>여행 계획</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">여행 계획 세우기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="plans" :fields="fields" @row-clicked="viewPlan">
          <template #cell(index)="data">{{ plans.length - data.index }}</template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listPlan } from "@/api/plan";
import { mapGetters } from 'vuex';

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
    };
  },
  computed: {
    ...mapGetters(userStore, ["checkToken"]),
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

<style scoped></style>
