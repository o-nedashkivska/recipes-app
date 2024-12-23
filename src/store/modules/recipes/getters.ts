import type { GetterTree } from "vuex";
import { Getters } from "./types";
import type { State } from "./types";
import type { RootState } from "@/store/types";
import { DataStatus } from "@/enums";

const getters: GetterTree<State, RootState> = {
  [Getters.GET_RECIPE_BY_ID]: (state) => (id: string) => {
    return state.recipes.find((recipe) => recipe.id === id);
  },
  [Getters.IS_LOADING]: (state) => {
    return (
      state.dataStatus === DataStatus.IDLE ||
      state.dataStatus === DataStatus.PENDING
    );
  },
};

export { getters };
