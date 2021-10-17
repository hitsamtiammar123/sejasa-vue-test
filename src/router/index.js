import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/location",
    name: "Location",
    component: () => import("../views/Location.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from, next) => {
  // ...
  window.scrollTo({
    top: 0,
  });
  if (typeof next === "function") {
    next();
  }
});

export default router;
