import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/leaflet";
import LoadingOverlay from "./components/LoadingOverlay.vue";

Vue.config.productionTip = false;

Vue.component("loading-overlay", LoadingOverlay);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
