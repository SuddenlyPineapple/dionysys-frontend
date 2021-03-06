import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    routes: [
      {
        text: "Audits",
        to: "/"
      },
      {
        text: "Machines",
        to: "/machines"
      },
      {
        text: "Configurations",
        to: "/configs"
      },
      {
        text: "Raports",
        to: "/raports"
      }
    ]
  },
  getters: {
    routes: state => {
      return state.routes;
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {}
});
