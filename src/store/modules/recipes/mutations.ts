import { v4 as uuidv4 } from "uuid";
import { Mutations } from "./types";
import type { State } from "./types";

import type { MutationTree } from "vuex";

export const DEFAULT_IMAGE = "/recipe-default-image.png";

const mutations: MutationTree<State> = {
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
    const createdAt = Date.now();

    state.recipes = [
      ...state.recipes,
      {
        id,
        versions: [
          {
            ...newRecipe,
            createdAt,
            image: newRecipe.image ?? DEFAULT_IMAGE,
          },
        ],
      },
    ];
  },
  [Mutations.UPDATE_RECIPE](state, updatedRecipe) {
    const createdAt = Date.now();
    const { id, ...updatedRecipeData } = updatedRecipe;

    state.recipes = state.recipes.map((recipe) => {
      if (recipe.id !== id) {
        return recipe;
      }

      const newVersion = {
        ...updatedRecipeData,
        createdAt,
      };

      if (updatedRecipeData.image === "") {
        newVersion.image = DEFAULT_IMAGE;
      }

      return {
        id: recipe.id,
        versions: [...recipe.versions, newVersion],
      };
    });
  },
  [Mutations.DELETE_RECIPE_BY_ID](state, id) {
    state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  },
};

export { mutations };
