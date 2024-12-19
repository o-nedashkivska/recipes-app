import Vue from "vue";
import Vuex from "vuex";
import { recipesModule, recipesModuleName } from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [recipesModuleName]: recipesModule,
  },
});

export default store;
