export default {
  state: {
    message: "hello Store"
  },
  mutations: {},
  actions: {},
  getters: {
    getMessage(state) {
      return state.message;
    }
  }
};
