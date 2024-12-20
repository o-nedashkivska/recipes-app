import type { Module } from "vuex";
import {
  categories as categoriesData,
  tags as tagsData,
} from "@/data/data.json";
import { DataStatus } from "@/enums";
import type { State } from "./types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import type { RootState } from "@/store/types";

const moduleName = "recipes";

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    dataStatus: DataStatus.IDLE,
    error: "",
    recipes: [],
    categories: categoriesData,
    tags: tagsData,
  },
  getters,
  mutations,
  actions,
};

export { module, moduleName, type State };
