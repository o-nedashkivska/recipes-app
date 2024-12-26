<template>
  <div>
    <div v-if="showSpinner" class="d-flex justify-content-center mt-5">
      <b-spinner variant="success" class="spinner" />
    </div>
    <RecipeDetail v-else :key="$route.fullPath" :recipe="recipe" />
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import { BSpinner } from "bootstrap-vue";
  import RecipeDetail from "@/components/RecipeDetail";
  import { recipesModuleName } from "@/store/modules";
  import { DataStatus } from "@/enums";
  import { Actions, Getters } from "@/store/modules/recipes/types";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      RecipeDetail,
      BSpinner,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState(recipesModuleName, ["dataStatus"]),
      ...mapGetters(recipesModuleName, {
        getRecipe: Getters.GET_RECIPE_BY_ID,
        isLoading: Getters.IS_LOADING,
      }),
      recipe() {
        const recipe = this.getRecipe(this.id);

        if (!recipe) {
          this.$router.replace({ name: RouteName.NOT_FOUND });
          return;
        }

        return recipe;
      },
      showSpinner() {
        return this.isLoading || !this.recipe;
      },
    },
    mounted() {
      if (this.dataStatus === DataStatus.IDLE) {
        this.fetchAllRecipes();
      }
    },
    methods: {
      ...mapActions(recipesModuleName, {
        fetchAllRecipes: Actions.FETCH_ALL_RECIPES,
      }),
    },
  };
</script>

<style>
  .spinner {
    width: 100px;
    height: 100px;
  }
</style>
