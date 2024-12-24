import type { ActionTree } from "vuex";
import { DataStatus } from "@/enums";
import type { State } from "./types";
import { Actions, Mutations } from "./types";
import type { Recipe } from "@/types";
import { recipes as recipesData } from "@/data/data.json";
import type { RootState } from "@/store/types";

const actions: ActionTree<State, RootState> = {
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
  async [Actions.ADD_RECIPE]({ commit }, newRecipe) {
    try {
      commit(Mutations.SET_DATA_STATUS, DataStatus.PENDING);

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      commit(Mutations.ADD_RECIPE, newRecipe);
      commit(Mutations.SET_DATA_STATUS, DataStatus.FULFILLED);
    } catch (e) {
      commit(Mutations.SET_ERROR, e);
      commit(Mutations.SET_DATA_STATUS, DataStatus.REJECTED);
    }
  },
  async [Actions.UPDATE_RECIPE]({ commit }, updatedRecipe) {
    try {
      commit(Mutations.SET_DATA_STATUS, DataStatus.PENDING);

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      commit(Mutations.UPDATE_RECIPE, updatedRecipe);
      commit(Mutations.SET_DATA_STATUS, DataStatus.FULFILLED);
    } catch (e) {
      commit(Mutations.SET_ERROR, e);
      commit(Mutations.SET_DATA_STATUS, DataStatus.REJECTED);
    }
  },
  async [Actions.DELETE_RECIPE_BY_ID]({ commit }, id) {
    try {
      commit(Mutations.SET_DATA_STATUS, DataStatus.PENDING);

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      commit(Mutations.DELETE_RECIPE_BY_ID, id);
      commit(Mutations.SET_DATA_STATUS, DataStatus.FULFILLED);
    } catch (e) {
      commit(Mutations.SET_ERROR, e);
      commit(Mutations.SET_DATA_STATUS, DataStatus.REJECTED);
    }
  },
};

export { actions };
