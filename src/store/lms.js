import { createStore } from "vuex";

const lms = createStore({
  state: {
    role: localStorage.getItem("role") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    count: localStorage.getItem("count") || null,
  },
  getters: {
    getRole: (state) => {
      return state.role;
    },
    getUser: (state) => {
      return state.user;
    },
    getCount: (state) => {
      return state.count;
    },
  },
  mutations: {
    setRole(state, role) {
      state.role = role;
      localStorage.setItem("role", role);
    },
    setCount(state, count) {
      state.count = count;
      localStorage.setItem("count", count);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    updateRole({ commit }, role) {
      commit("setRole", role);
    },
    updateCount({ commit }, count) {
      commit("setCount", count);
    },
    updateUser({ commit }, user) {
      commit("setUser", user);
    },
  },
});

export default lms;
