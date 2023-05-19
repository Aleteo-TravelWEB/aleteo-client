import Vue from "vue";
import VueRouter from "vue-router";

// views
import AppMain from "@/views/AppMain";
import AppBoard from "@/views/AppBoard";
import AppPlan from "@/views/AppPlan";
import AppHotPlace from "@/views/AppHotPlace";
import AppNotice from "@/views/AppNotice";
import AppUser from "@/views/AppUser";

import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  // console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    // console.log("토큰 유효성 체크");
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    router.push({ name: "login" });
  } else {
    console.log("로그인 성공");
    next();
  }
};

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
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "view/:id",
        name: "boardview",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "write",
        name: "boardwrite",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "modify",
        name: "boardmodify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardModify"),
      },
      {
        path: "delete",
        name: "deleteboard",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: AppNotice,
  },
  {
    path: "/plan",
    name: "plan",
    component: AppPlan,
    redirect: "plan/list",
    children: [
      {
        path: "list",
        name: "planlist",
        component: () => import("@/components/plan/PlanList"),
      },
      {
        path: "view/:planId",
        name: "planview",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/plan/PlanView"),
      },
      {
        path: "write",
        name: "planwrite",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/plan/PlanWrite"),
      }
    ]
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: AppHotPlace,
    redirect: "/hotplace/list",
    children: [
      {
        path: "list",
        name: "hotplacelist",
        component: () => import("@/components/hotplace/HotplaceList"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: AppUser,
    // redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin"),
      },
      {
        path: "join",
        name: "join",
        component: () => import("@/components/user/UserJoin"),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserMyPage"),
      },
      {
        path: "modify",
        name: "modify",
        beforeEnter: onlyAuthUser,
        component: () => import("@/components/user/UserModify"),
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
