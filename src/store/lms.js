import { createStore } from "vuex";

const lms = createStore({
  state: {
    role: localStorage.getItem("role") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    count: localStorage.getItem("count") || 0,
    cart: JSON.parse(localStorage.getItem("cart")) || [],
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
    getCart: (state) => {
      return state.cart;
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
    setCart(state, item) {
      state.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setPopCart(state,item){
      state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
      localStorage.setItem("cart",JSON.stringify(state.cart));
    }
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
