import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store/store'
import axios from "axios";

import LoginPage from "./pages/login-page.vue";
import ContactPage from "./pages/contact-page.vue";
import AddRecipePage from "./pages/add-recipe-page/add-recipe-page.vue";
import MainSearchPage from "./pages/main-search-page.vue";
import SubCategorySearchPage from "./pages/subcategory-search-page.vue";
import FilteredRecipesPage from "./pages/filtered-recipes-page.vue";
import RecipePage from "./pages/recipe-page.vue";
import RecipesSearchResultsPage from "./pages/recipes-search-results-page.vue";
import AddIngredientsPage from "./pages/add-ingredients-page.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("foodBibleToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

const routes = [
  { path: '/', component: MainSearchPage },
  { path: '/login', component: LoginPage },
  { path: '/contact', component: ContactPage },
  { path: '/categories/:catId', component: SubCategorySearchPage },
  { path: '/categories/:catId/subcategory/:subCatId', component: FilteredRecipesPage },
  { path: '/search/:searchWord', component: RecipesSearchResultsPage },
  { path: '/recipe/:id', component: RecipePage },
  {
    path: '/recipes/add', component: AddRecipePage, beforeEnter: (to, from, next) => {
      if (store.state.loggedIn) next();
      else next(false);
    }
  },
  {
    path: '/recipes/edit/:recipeId', component: AddRecipePage, beforeEnter: (to, from, next) => {
      if (store.state.loggedIn) next();
      else next(false);
    }
  },
  {
    path: '/ingredients/add', component: AddIngredientsPage, beforeEnter: (to, from, next) => {
      if (store.state.loggedIn) next();
      else next(false);
    }
  }
];

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')