const state = {
  info: {
    data: "store data from user"
  },
  auth: {}
};

const mutations = {};

const getters = {
  info: (state: { info: string }): string => state.info
};

export default {
  state,
  mutations,
  actions: {},
  getters
};
