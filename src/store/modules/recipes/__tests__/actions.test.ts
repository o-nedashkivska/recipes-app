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

    const fetchAllRecipes = actions[FETCH_ALL_RECIPES] as ActionHandler<
      State,
      RootState
    >;

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("commits set recipes mutation if there was no error", async () => {
      await fetchAllRecipes.call(storeContext, {
        commit,
      } as unknown as ActionContext<State, RootState>);

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_RECIPES, recipesData);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });

    it("commits set error mutation if error is thrown", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      await fetchAllRecipes.call(storeContext, {
        commit,
      } as unknown as ActionContext<State, RootState>);

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });
  });

  describe("ADD_RECIPE", () => {
    let commit: typeof jest.fn;

    const addRecipe = actions[ADD_RECIPE] as ActionHandler<State, RootState>;

    const newRecipe = {
      title: "Some title",
      category: "Some category",
      instructions: "1. Step 1; 2. Step 2",
    };

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("commits add recipe mutation if there was no error", async () => {
      await addRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        newRecipe
      );

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.ADD_RECIPE, newRecipe);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.FULFILLED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });

    it("commits set error mutation if error is thrown", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      await addRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        newRecipe
      );

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });
  });

  describe("UPDATE_RECIPE", () => {
    let commit: typeof jest.fn;

    const updateRecipe = actions[UPDATE_RECIPE] as ActionHandler<
      State,
      RootState
    >;

    const updatedRecipe = {
      title: "Some title",
      category: "Some category",
      instructions: "1. Step 1; 2. Step 2",
    };

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("commits update recipe mutation if there was no error", async () => {
      await updateRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        updatedRecipe
      );

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
      expect(commit).toHaveBeenCalledTimes(3);
    });

    it("commits set error mutation if error is thrown", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      await updateRecipe.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        updatedRecipe
      );

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });
  });

  describe("DELETE_RECIPE_BY_ID", () => {
    let commit: typeof jest.fn;

    const deleteRecipeById = actions[DELETE_RECIPE_BY_ID] as ActionHandler<
      State,
      RootState
    >;

    const recipeId = "some-id";

    beforeEach(() => {
      commit = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("commits delete recipe mutation if there was no error", async () => {
      await deleteRecipeById.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        recipeId
      );

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
      expect(commit).toHaveBeenCalledTimes(3);
    });

    it("commits set error mutation if error is thrown", async () => {
      const error = new Error("Some Error");

      jest.spyOn(global, "setTimeout").mockImplementationOnce(() => {
        throw error;
      });

      await deleteRecipeById.call(
        storeContext,
        { commit } as unknown as ActionContext<State, RootState>,
        recipeId
      );

      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.PENDING
      );
      expect(commit).toHaveBeenCalledWith(Mutations.SET_ERROR, error);
      expect(commit).toHaveBeenCalledWith(
        Mutations.SET_DATA_STATUS,
        DataStatus.REJECTED
      );
      expect(commit).toHaveBeenCalledTimes(3);
    });
  });
});
