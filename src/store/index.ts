import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import {
  recipes as recipesData,
  categories as categoriesData,
  tags as tagsData,
} from "@/data/data.json";
import { Actions, Getters, Mutations } from "./enums";
import { DataStatus } from "@/enums";
import type { State } from "./types/state";
import type { Recipe } from "@/types";

Vue.use(Vuex);

const DEFAULT_IMAGE = "/recipe-default-image.png";

const store = new Vuex.Store<State>({
  state: {
    dataStatus: DataStatus.IDLE,
    error: "",
    recipes: [],
    categories: categoriesData,
    tags: tagsData,
  },
  getters: {
    [Getters.GET_RECIPE_BY_ID]: (state) => (id: string) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
  },
  mutations: {
    [Mutations.SET_RECIPES](state, recipes) {
      state.recipes = recipes;
    },
    [Mutations.SET_DATA_STATUS](state, dataStatus) {
      state.dataStatus = dataStatus;
    },
    [Mutations.SET_ERROR](state, error) {
      state.error = error;
    },
    [Mutations.ADD_RECIPE](state, newRecipe) {
      const id = uuidv4();
      const updatedAt = Date.now();

      state.recipes = [
        ...state.recipes,
        {
          ...newRecipe,
          id,
          updatedAt,
          image: newRecipe.image === "" ? DEFAULT_IMAGE : newRecipe.image,
        },
      ];
    },
    [Mutations.UPDATE_RECIPE](state, updatedRecipe) {
      const updatedAt = Date.now();

      state.recipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? {
              ...recipe,
              ...updatedRecipe,
              updatedAt,
              image:
                updatedRecipe.image === ""
                  ? DEFAULT_IMAGE
                  : updatedRecipe.image,
            }
          : recipe
      );
    },
    [Mutations.DELETE_RECIPE_BY_ID](state, id) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    },
  },
  actions: {
    async [Actions.FETCH_ALL_RECIPES]({ commit }) {
      try {
        commit(Mutations.SET_DATA_STATUS, DataStatus.PENDING);

        const data: Recipe[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(recipesData);
          }, 1000);
        });

        commit(Mutations.SET_RECIPES, [...data]);
        commit(Mutations.SET_DATA_STATUS, DataStatus.FULFILLED);
      } catch (e) {
        commit(Mutations.SET_ERROR, e);
        commit(Mutations.SET_DATA_STATUS, DataStatus.REJECTED);
      }
    },
  },
});

export default store;
