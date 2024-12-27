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
    it("should set correct recipes", () => {
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
    it("should set correct status", () => {
      const state = {
        ...rootState.recipes,
      };

      const dataStatus = DataStatus.REJECTED;

      mutations[SET_DATA_STATUS](state, dataStatus);

      expect(state.dataStatus).toBe(dataStatus);
    });
  });

  describe("SET_ERROR", () => {
    it("should set correct error", () => {
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

    it("should add new recipe", () => {
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

    it("should add recipe with default image", () => {
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

    it("should update existing recipe", () => {
      const recipes = [
        {
          id: "id1",
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
        },
        {
          id: "id2",
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
        },
      ];

      const state: State = {
        ...rootState.recipes,
        recipes,
      };

      const updatedRecipeData = {
        title: "Updated title",
        category: "Updated category",
      };

      mutations[UPDATE_RECIPE](state, {
        ...updatedRecipeData,
        id: recipes[0].id,
      });

      const [firstRecipe, secondRecipe] = state.recipes;

      expect(firstRecipe).not.toEqual(recipes[0]);
      expect(secondRecipe).toEqual(recipes[1]);

      const { versions } = firstRecipe;

      expect(versions[0]).toEqual(recipes[0].versions[0]);
      expect(versions[1]).toEqual({
        ...updatedRecipeData,
        createdAt: timestamp,
      });
    });

    it("should update existing recipe and use default image", () => {
      const recipes = [
        {
          id: "id1",
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
        },
        {
          id: "id2",
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
        },
      ];

      const state: State = {
        ...rootState.recipes,
        recipes,
      };

      const updatedRecipeData = {
        image: "",
      };

      mutations[UPDATE_RECIPE](state, {
        ...updatedRecipeData,
        id: recipes[0].id,
      });

      const [firstRecipe, secondRecipe] = state.recipes;

      expect(firstRecipe).not.toEqual(recipes[0]);
      expect(secondRecipe).toEqual(recipes[1]);

      const { versions } = firstRecipe;

      expect(versions[0]).toEqual(recipes[0].versions[0]);
      expect(versions[1]).toEqual({
        ...updatedRecipeData,
        image: DEFAULT_IMAGE,
        createdAt: timestamp,
      });
    });
  });

  describe("DELETE_RECIPE_BY_ID", () => {
    it("should delete existing recipe by its id", () => {
      const recipe1 = {
        id: "id1",
        versions: [],
      };
      const recipe2 = {
        id: "id2",
        versions: [],
      };

      const state = {
        ...rootState.recipes,
        recipes: [recipe1, recipe2],
      };

      mutations[DELETE_RECIPE_BY_ID](state, recipe1.id);

      expect(state.recipes).toHaveLength(1);
      expect(state.recipes).not.toContain(recipe1);
      expect(state.recipes).toContain(recipe2);
    });

    it("should do nothing if nonexistent id is provided", () => {
      const recipe1 = {
        id: "id1",
        versions: [],
      };
      const recipe2 = {
        id: "id2",
        versions: [],
      };

      const state = {
        ...rootState.recipes,
        recipes: [recipe1, recipe2],
      };

      mutations[DELETE_RECIPE_BY_ID](state, "invalid-id");

      expect(state.recipes).toHaveLength(2);
      expect(state.recipes).toContain(recipe1);
      expect(state.recipes).toContain(recipe2);
    });
  });
});
