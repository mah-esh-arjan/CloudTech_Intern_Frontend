import { createStore } from "vuex";

const lms = createStore({
  state: {
    role: localStorage.getItem("role") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    count: localStorage.getItem("count") || 0,
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    bookIds: JSON.parse(localStorage.getItem("bookIds")) || []
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
    getBookIds: (state) => {
      return state.bookIds;
    }
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
    setPopCart(state, item) {
      state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setClearCart(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    setBookIds(state, bookIds) {
      state.bookIds = state.bookIds.concat(bookIds);
      localStorage.setItem("bookIds", JSON.stringify(state.bookIds));
    },
    setPopBookIds(state, bookIds) {
      state.bookIds = state.bookIds.filter(oldIds => !bookIds.includes(oldIds));
      localStorage.setItem("bookIds", JSON.stringify(state.bookIds));
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
    updateClear({ commit }, cart) {
      commit("setClearCart", cart);
    },
    updateBookIds({ commit }, bookIds) {
      commit("setBookIds", bookIds);
    }
  },
});

export default lms;
