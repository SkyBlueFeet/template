import Vue from "vue";
import Vuex, { Store } from "vuex";

import user from "./modules/user";

Vue.use(Vuex);

export interface GlobalState {
  user: typeof user.state;
}

export interface GlobalStore {
  state: GlobalState;
}

const store: Store<GlobalState> = new Vuex.Store({
  modules: {
    user
  }
});

export default store;
