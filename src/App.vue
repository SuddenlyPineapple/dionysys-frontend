<template>
  <v-app>
    <Toolbar />
    <Drawer />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Drawer from "./components/Drawer.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    Drawer
  },
  data: () => ({
    //
  })
};
</script>

<style lang="scss">
div#app {
  font-family: "Roboto";
}
v-navigation-drawer {
  min-height: 200px;
}
.marg-56 {
  margin-top: 56px;
}
</style>
