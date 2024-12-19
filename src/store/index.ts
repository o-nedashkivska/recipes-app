import Vue from "vue";
import Vuex from "vuex";
import { recipesModule } from "./modules";

Vue.use(Vuex);

export const recipesModuleName = "recipes";

const store = new Vuex.Store({
  modules: {
    [recipesModuleName]: recipesModule,
  },
});

export default store;
