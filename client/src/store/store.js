import Vue from 'vue'
import Vuex from 'vuex'
import config from "../helpers/categories.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: config.categories,
    markedCategories: [],
    loggedIn: false
  },
  mutations: {
    setMarkedCategory(state, category) {
      let currentCategories = state.markedCategories;
      currentCategories.push(category);
      Vue.set(state, "markedCategories", currentCategories);
    },
    removeMarkedCategory(state, category) {
      let currentCategories = state.markedCategories;
      currentCategories = currentCategories.filter(c => c !== category);
      Vue.set(state, "markedCategories", currentCategories);
    },
    resetMarkedCategories(state) {
      Vue.set(state, "markedCategories", []);
    },
    setLoggedIn(state, isLoggedIn) {
      state.loggedIn = isLoggedIn;
    }
  }
})
