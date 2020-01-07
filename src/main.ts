import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { CreateElement, VNode } from "vue/types/umd";

Vue.config.productionTip = false;

export default new Vue({
  el: "#app",
  store,
  router,
  render: (h: CreateElement): VNode => h(App)
});
