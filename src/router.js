import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Audit from "./views/Audits.vue";
import Configs from "./views/Configs.vue";
import Raports from "./views/Raports.vue";
import Machines from "./views/Machines.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "audits",
      component: Audit
    },
    {
      path: "/configs",
      name: "configs",
      component: Configs
    },
    {
      path: "/raports",
      name: "raports",
      component: Raports
    },
    {
      path: "/machines",
      name: "machines",
      component: Machines
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
