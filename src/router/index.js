import Vue from "vue";
import VueRouter from "vue-router";

// views
import AppMain from "@/views/AppMain";
import AppBoard from "@/views/AppBoard";
import AppPlan from "@/views/AppPlan";
import AppHotPlace from "@/views/AppHotPlace";
import AppNotification from "@/views/AppNotice";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
  },
  {
    path: "/board",
    name: "board",
    component: AppBoard,
  },
  {
    path: "/notification",
    name: "notification",
    component: AppNotification,
  },
  {
    path: "/plan",
    name: "plan",
    component: AppPlan,
  },
  {
    path: "/hotplace",
    name: "hoplace",
    component: AppHotPlace,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
