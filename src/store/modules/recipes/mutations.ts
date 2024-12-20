import { v4 as uuidv4 } from "uuid";
import { Mutations } from "./types";
import type { State } from "./types";

import type { MutationTree } from "vuex";

const DEFAULT_IMAGE = "/recipe-default-image.png";

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
              updatedRecipe.image === "" ? DEFAULT_IMAGE : updatedRecipe.image,
          }
        : recipe
    );
  },
  [Mutations.DELETE_RECIPE_BY_ID](state, id) {
    state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  },
};

export { mutations };
