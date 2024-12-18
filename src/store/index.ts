import Vue from "vue";
import Vuex from "vuex";
import recipes from "@/data/recipes.json";
import { Getters, Mutations } from "./enums";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recipes,
  },
  getters: {
    [Getters.GET_RECIPE_BY_ID]: (state) => (id: string) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
  },
  mutations: {
    [Mutations.DELETE_RECIPE_BY_ID](state, id) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    },
  },
});

export default store;
