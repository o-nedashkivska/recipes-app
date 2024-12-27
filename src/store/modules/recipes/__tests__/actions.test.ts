import { DataStatus } from "@/enums";
import { actions } from "../actions";
import { Actions, Mutations, type State } from "../types";
import type { ActionContext, ActionHandler, Store } from "vuex";
import type { RootState } from "@/store/types";
import { recipes as recipesData } from "@/data/data.json";

const { FETCH_ALL_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE_BY_ID } =
  Actions;

describe("actions", () => {
  const storeContext = {} as Store<RootState>;

  describe("FETCH_ALL_RECIPES", () => {
    let commit: typeof jest.fn;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should fetch recipes collection", async () => {
      const fetchAllRecipes = actions[FETCH_ALL_RECIPES] as ActionHandler<
        State,
        RootState
      >;

      await fetchAllRecipes.call(storeContext, {
        commit,
      } as unknown as ActionContext<State, RootState>);

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_RECIPES, recipesData);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
    });

    it("should throw an error during recipes fetch", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      const fetchAllRecipes = actions[FETCH_ALL_RECIPES] as ActionHandler<
        State,
        RootState
      >;

      await fetchAllRecipes.call(storeContext, {
        commit,
      } as unknown as ActionContext<State, RootState>);

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).not.toHaveBeenCalledWith(Mutations.SET_RECIPES);
    });
  });

  describe("ADD_RECIPE", () => {
    let commit: typeof jest.fn;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should add recipe", async () => {
      const newRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
      };

      const addRecipe = actions[ADD_RECIPE] as ActionHandler<State, RootState>;

      await addRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        newRecipe
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.ADD_RECIPE, newRecipe);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
    });

    it("should not add recipe if error is thrown", async () => {
      const newRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
      };

      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      const addRecipe = actions[ADD_RECIPE] as ActionHandler<State, RootState>;

      await addRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        newRecipe
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).not.toHaveBeenCalledWith(Mutations.ADD_RECIPE, newRecipe);
    });
  });

  describe("UPDATE_RECIPE", () => {
    let commit: typeof jest.fn;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should update recipe", async () => {
      const updatedRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
      };

      const updateRecipe = actions[UPDATE_RECIPE] as ActionHandler<
        State,
        RootState
      >;

      await updateRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        updatedRecipe
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(
        Mutations.UPDATE_RECIPE,
        updatedRecipe
      );
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
    });

    it("should not update recipe if error is thrown", async () => {
      const updatedRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
      };

      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      const updateRecipe = actions[UPDATE_RECIPE] as ActionHandler<
        State,
        RootState
      >;

      await updateRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        updatedRecipe
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).not.toHaveBeenCalledWith(
        Mutations.UPDATE_RECIPE,
        updatedRecipe
      );
    });
  });

  describe("DELETE_RECIPE_BY_ID", () => {
    let commit: typeof jest.fn;

    const recipeId = "some-id";

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should delete recipe", async () => {
      const deleteRecipeById = actions[DELETE_RECIPE_BY_ID] as ActionHandler<
        State,
        RootState
      >;

      await deleteRecipeById.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        recipeId
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(
        Mutations.DELETE_RECIPE_BY_ID,
        recipeId
      );
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
    });

    it("should not delete recipe if error is thrown", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      const deleteRecipeById = actions[DELETE_RECIPE_BY_ID] as ActionHandler<
        State,
        RootState
      >;

      await deleteRecipeById.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        recipeId
      );

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).not.toHaveBeenCalledWith(
        Mutations.DELETE_RECIPE_BY_ID,
        recipeId
      );
    });
  });
});
