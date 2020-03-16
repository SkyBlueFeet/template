const state = {
  info: {
    data: "store data from user"
  },
  auth: {}
};

const mutations = {};

type UserState = typeof state;

const getters = {
  info: (state: UserState): UserState["info"] => state.info
};

const user = {
  state,
  mutations,
  actions: {},
  getters
};

export default user;
