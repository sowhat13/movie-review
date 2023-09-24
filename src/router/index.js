import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "movie-detail",
    component: () =>
      import(
        /* webpackChunkName: "movie-detail" */ "../views/movieDetail/index.vue"
      ),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () =>
      import(
        /* webpackChunkName: "favorites" */ "../views/favorites/index.vue"
      ),
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search/index.vue"),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
