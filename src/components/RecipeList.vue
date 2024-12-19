<template>
  <div>
    <div
      v-if="isLoading"
      class="d-flex justify-content-center align-content-center mt-5"
    >
      <b-spinner variant="success" class="spinner" />
    </div>

    <div v-else-if="isRecipesListEmpty" class="d-flex flex-column w-50 info">
      <h3>There are no recipes yet</h3>
      <b-button
        variant="success"
        :to="createRecipePageLink"
        class="info-button"
      >
        Create new recipe
      </b-button>
    </div>

    <b-container v-else>
      <b-row>
        <b-col
          v-for="recipe in recipes"
          :key="recipe.id"
          md="6"
          lg="4"
          xl="3"
          class="mb-4"
        >
          <RecipeCard
            :id="recipe.id"
            :title="recipe.title"
            :category="recipe.category"
            :instructions="recipe.instructions"
            :image="recipe.image"
            :updatedAt="recipe.updatedAt"
            :tags="recipe.tags"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  import { BCol, BContainer, BRow, BSpinner, BButton } from "bootstrap-vue";
  import RecipeCard from "@/components/RecipeCard";
  import { Actions } from "@/store/modules/recipes/enums";
  import { DataStatus } from "@/enums";
  import { RouteName } from "@/router/enums";
  import { recipesModuleName } from "@/store";

  const { mapState, mapActions } = createNamespacedHelpers(recipesModuleName);

  export default {
    components: {
      BContainer,
      BRow,
      BCol,
      RecipeCard,
      BSpinner,
      BButton,
    },
    data() {
      return {
        createRecipePageLink: {
          name: RouteName.CREATE_RECIPE,
        },
      };
    },
    computed: {
      ...mapState(["recipes", "error"]),
      ...mapState({
        isLoading: (state) =>
          state.dataStatus === DataStatus.IDLE ||
          state.dataStatus === DataStatus.PENDING,
      }),
      isRecipesListEmpty() {
        return this.recipes.length === 0;
      },
    },
    methods: {
      ...mapActions([Actions.FETCH_ALL_RECIPES]),
    },
    mounted() {
      if (this.isRecipesListEmpty) {
        this[Actions.FETCH_ALL_RECIPES]();
      }
    },
  };
</script>

<style scoped>
  .spinner {
    width: 100px;
    height: 100px;
  }
  .info {
    margin: 50px auto 0;
    gap: 10px;
    padding: 0 10px;
    min-width: 320px;
  }
  .info-button {
    width: max-content;
  }
</style>
