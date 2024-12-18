import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import { recipes, categories, tags } from "@/data/data.json";
import { Getters, Mutations } from "./enums";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recipes,
    categories,
    tags,
  },
  getters: {
    [Getters.GET_RECIPE_BY_ID]: (state) => (id: string) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
  },
  mutations: {
    [Mutations.ADD_RECIPE](state, newRecipe) {
      if (!newRecipe.image) {
        newRecipe.image = "/recipe-default-image.png";
      }

      const id = uuidv4();
      state.recipes.push({ ...newRecipe, id });
    },
    [Mutations.DELETE_RECIPE_BY_ID](state, id) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    },
  },
});

export default store;
