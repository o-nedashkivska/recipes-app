import { DataStatus } from "@/enums";
import { getters } from "../getters";
import { Getters } from "../types";

const rootState = {
  recipes: {
    dataStatus: DataStatus.IDLE,
    error: "",
    recipes: [],
    categories: [],
    tags: [],
  },
};

const { GET_RECIPE_BY_ID, IS_LOADING } = Getters;

describe("getters", () => {
  describe("GET_RECIPE_BY_ID", () => {
    const recipeId = "some-test-id";

    const state = {
      ...rootState.recipes,
      recipes: [{ id: recipeId, versions: [] }],
    };

    const getRecipeById = getters[GET_RECIPE_BY_ID](state, {}, rootState, {});

    it("returns existing recipe by its id", () => {
      const recipe = getRecipeById(recipeId);

      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(recipeId);
    });

    it("returns undefined if nonexistent recipe id is provided", () => {
      const incorrectRecipeId = "some-test-id2";

      const recipe = getRecipeById(incorrectRecipeId);

      expect(recipe).toBeUndefined();
    });
  });

  describe("IS_LOADING", () => {
    it("returns true when dataStatus is idle", () => {
      const state = { ...rootState.recipes };

      const result = getters[IS_LOADING](state, {}, rootState, {});

      expect(result).toBeTruthy();
    });

    it("returns true when dataStatus is pending", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.PENDING };

      const result = getters[IS_LOADING](state, {}, rootState, {});

      expect(result).toBeTruthy();
    });

    it("returns false when dataStatus is fulfilled", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.FULFILLED };

      const result = getters[IS_LOADING](state, {}, rootState, {});

      expect(result).toBeFalsy();
    });

    it("returns false when dataStatus is rejected", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.REJECTED };

      const result = getters[IS_LOADING](state, {}, rootState, {});

      expect(result).toBeFalsy();
    });
  });
});
