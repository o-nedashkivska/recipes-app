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
    it("should return existing recipe by its id", () => {
      const recipeId = "some-test-id";

      const state = {
        ...rootState.recipes,
        recipes: [{ id: recipeId, versions: [] }],
      };

      const recipe = getters[GET_RECIPE_BY_ID](
        state,
        undefined,
        rootState,
        undefined
      )(recipeId);

      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(recipeId);
    });

    it("should return undefined if nonexistent recipe id is provided", () => {
      const recipeId = "some-test-id";
      const incorrectRecipeId = "some-test-id2";

      const state = {
        ...rootState.recipes,
        recipes: [{ id: recipeId, versions: [] }],
      };

      const recipe = getters[GET_RECIPE_BY_ID](
        state,
        undefined,
        rootState,
        undefined
      )(incorrectRecipeId);

      expect(recipe).toBeUndefined();
    });
  });

  describe("IS_LOADING", () => {
    it("should return true when dataStatus is idle", () => {
      const state = { ...rootState.recipes };

      const result = getters[IS_LOADING](
        state,
        undefined,
        rootState,
        undefined
      );

      expect(result).toBe(true);
    });

    it("should return true when dataStatus is pending", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.PENDING };

      const result = getters[IS_LOADING](
        state,
        undefined,
        rootState,
        undefined
      );

      expect(result).toBe(true);
    });

    it("should return false when dataStatus is fulfilled", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.FULFILLED };

      const result = getters[IS_LOADING](
        state,
        undefined,
        rootState,
        undefined
      );

      expect(result).toBe(false);
    });

    it("should return false when dataStatus is rejected", () => {
      const state = { ...rootState.recipes, dataStatus: DataStatus.REJECTED };

      const result = getters[IS_LOADING](
        state,
        undefined,
        rootState,
        undefined
      );

      expect(result).toBe(false);
    });
  });
});
