import * as lodash from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router';
import { Route } from 'vue-router';
import { Store } from 'vuex';

// 全局变量设置
declare global {
  const _: typeof lodash
}

// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
        $store: Store<any>;
        $Message: any,
        $Modal: any
    }
}
