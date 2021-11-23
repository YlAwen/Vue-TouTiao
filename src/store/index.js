import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储用户token
    user: JSON.parse(localStorage.getItem("TOUTIAO_USER")) || null,
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      // 把数据备份到本地
      localStorage.setItem("TOUTIAO_USER", JSON.stringify(state.user));
    },
  },
  actions: {},
  modules: {},
});
