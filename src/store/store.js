import { createStore } from "vuex";

const store = createStore({
  state: {
    dummyCard: [
      {
        id: 1,
        title: "Learn Vue Router",
        description:
          "Understand how to set up and use Vue Router for navigation in a Vue.js application.",
        Read: false,
      },
      {
        id: 2,
        title: "Introduction to Vue.js",
        description:
          "A beginner-friendly guide to understanding Vue.js and its core concepts.",
        Read: false,
      },
      {
        id: 3,
        title: "State Management with Vuex",
        description:
          "Learn how to manage global state in a Vue.js application using Vuex.",
        Read: false,
      },
      {
        id: 4,
        title: "Working with Slots in Vue",
        description:
          "Explore how to use slots for creating flexible and reusable components in Vue.js.",
        Read: false,
      },
    ],
  },
  getters: {
    allCards: (state) => {
      return state.dummyCard;
    },
    cardId: (state) => (id) => {
      return state.dummyCard.find((card) => card.id === id);
    },
  },

  mutations: {
    toggleRead(state, id) {
      const blog = state.dummyCard.find((card) => card.id === id);
      if (blog) {
        blog.Read = !blog.Read;
      }
    },
    logRead(state, id) {
      const blog = state.dummyCard.find((card) => card.id === id);
      if(blog){
        console.log('Blog was found');
      }
      else{
        console.log('Blog was not found');
      }
    },
  },

  actions: {
    toggleReadStatusAndLog({ commit }, id) {
      commit('logRead', id);      
      commit('toggleRead', id);  
    },
  },
});

export default store;
