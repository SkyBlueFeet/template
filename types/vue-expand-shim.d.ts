import lodash from "lodash";
import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router";
import { Store as Vuex } from "vuex";
import { GlobalState } from "@src/store";
// 全局变量设置
declare global {
  const _: typeof lodash;
}

// 扩充
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Vuex<any>;
    $$store: Vuex<GlobalState>;
  }
}
