import { DataStatus } from "@/enums";
import { mutations, DEFAULT_IMAGE } from "../mutations";
import { Mutations, type State } from "../types";

const {
  SET_RECIPES,
  SET_DATA_STATUS,
  SET_ERROR,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE_BY_ID,
} = Mutations;

const rootState = {
  recipes: {
    dataStatus: DataStatus.IDLE,
    error: "",
    recipes: [],
    categories: [],
    tags: [],
  },
};

jest.mock("uuid", () => ({
  __esModule: true,
  ...jest.requireActual("uuid"),
  v4: () => "3e6def17-5e87-4f27-b6b8-ae78948523a9",
}));

const idRegexp = new RegExp(
  "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$",
  "i"
);

describe("mutations", () => {
  describe("SET_RECIPES", () => {
    it("sets correct recipes", () => {
      const state = {
        ...rootState.recipes,
      };

      const recipes = [
        { id: "id1", versions: [] },
        { id: "id2", versions: [] },
      ];

      mutations[SET_RECIPES](state, recipes);

      expect(state.recipes).toBe(recipes);
    });
  });

  describe("SET_DATA_STATUS", () => {
    it("sets correct status", () => {
      const state = {
        ...rootState.recipes,
      };

      const dataStatus = DataStatus.REJECTED;

      mutations[SET_DATA_STATUS](state, dataStatus);

      expect(state.dataStatus).toBe(dataStatus);
    });
  });

  describe("SET_ERROR", () => {
    it("sets correct error", () => {
      const state = {
        ...rootState.recipes,
      };

      const error = "Some Error";

      mutations[SET_ERROR](state, error);

      expect(state.error).toBe(error);
    });
  });

  describe("ADD_RECIPE", () => {
    const timestamp = 1735249979530;

    beforeEach(() => {
      jest.spyOn(Date, "now").mockReturnValue(timestamp);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("adds new recipe", () => {
      const state: State = {
        ...rootState.recipes,
        recipes: [],
      };

      const newRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
        image: "/some-image-path",
        parent: "some-id",
      };

      mutations[ADD_RECIPE](state, newRecipe);

      expect(state.recipes).toHaveLength(1);

      const { id, versions } = state.recipes[0];

      expect(id).toMatch(idRegexp);
      expect(versions).toHaveLength(1);
      expect(versions[0]).toEqual({ ...newRecipe, createdAt: timestamp });
    });

    it("adds new recipe with default image when no image was provided", () => {
      const state: State = {
        ...rootState.recipes,
        recipes: [],
      };

      const newRecipe = {
        title: "Some title",
        category: "Some category",
        instructions: "1. Step 1; 2. Step 2",
      };

      mutations[ADD_RECIPE](state, newRecipe);

      expect(state.recipes).toHaveLength(1);

      const image = state.recipes[0].versions[0].image;
      expect(image).toBe(DEFAULT_IMAGE);
    });
  });

  describe("UPDATE_RECIPE", () => {
    const timestamp = 1735249979530;

    beforeEach(() => {
      jest.spyOn(Date, "now").mockReturnValue(timestamp);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("updates existing recipe", () => {
      const recipe = {
        id: "some-id",
        versions: [
          {
            title: "Some title",
            category: "Some category",
            instructions: "1. Step 1; 2. Step 2",
            image: "/some-image-path",
            parent: "some-id",
            createdAt: timestamp,
          },
        ],
      };

      const state: State = {
        ...rootState.recipes,
        recipes: [recipe],
      };

      const updatedRecipeData = {
        title: "Updated title",
        category: "Updated category",
      };

      mutations[UPDATE_RECIPE](state, { ...updatedRecipeData, id: recipe.id });

      const { versions } = state.recipes[0];

      expect(versions[0]).toEqual(recipe.versions[0]);
      expect(versions[1]).toEqual({
        ...updatedRecipeData,
        createdAt: timestamp,
      });
    });

    it("updates existing recipe and uses default image when empty string as image is provided", () => {
      const recipe = {
        id: "some-id",
        versions: [
          {
            title: "Some title",
            category: "Some category",
            instructions: "1. Step 1; 2. Step 2",
            image: "/some-image-path",
            parent: "some-id",
            createdAt: timestamp,
          },
        ],
      };
      const state: State = {
        ...rootState.recipes,
        recipes: [recipe],
      };

      const updatedRecipeData = {
        image: "",
      };

      mutations[UPDATE_RECIPE](state, { ...updatedRecipeData, id: recipe.id });

      const { versions } = state.recipes[0];

      expect(versions[0]).toEqual(recipe.versions[0]);
      expect(versions[1]).toEqual({
        ...updatedRecipeData,
        image: DEFAULT_IMAGE,
        createdAt: timestamp,
      });
    });
  });

  describe("DELETE_RECIPE_BY_ID", () => {
    it("deletes existing recipe by its id", () => {
      const recipeId = "some-test-id";

      const state = {
        ...rootState.recipes,
        recipes: [{ id: recipeId, versions: [] }],
      };

      mutations[DELETE_RECIPE_BY_ID](state, recipeId);

      expect(state.recipes).toHaveLength(0);
    });

    it("does nothing if nonexistent id provided", () => {
      const recipeId = "some-test-id";

      const recipe = { id: recipeId, versions: [] };

      const state = {
        ...rootState.recipes,
        recipes: [recipe],
      };

      mutations[DELETE_RECIPE_BY_ID](state, "invalid-id");

      expect(state.recipes).toHaveLength(1);
      expect(state.recipes[0]).toBe(recipe);
    });
  });
});
