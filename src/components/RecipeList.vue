<template>
  <b-overlay :show="isLoading" no-center>
    <template #overlay>
      <div class="d-flex justify-content-center mt-5">
        <b-spinner variant="success" class="spinner" />
      </div>
    </template>

    <div class="pt-4">
      <div
        v-if="!isLoading && isRecipesListEmpty"
        class="d-flex flex-column w-50 info"
      >
        <h3>There are no recipes yet</h3>
        <b-button
          variant="success"
          :to="createRecipePageLink"
          class="info-button"
        >
          Create new recipe
        </b-button>
      </div>

      <b-container v-if="!isRecipesListEmpty">
        <b-row>
          <b-col
            v-for="{ versions, id } in recipes"
            :key="id"
            md="6"
            lg="4"
            xl="3"
            class="mb-4"
          >
            <RecipeCard
              :id="id"
              :title="versions.at(-1).title"
              :category="versions.at(-1).category"
              :instructions="versions.at(-1).instructions"
              :image="versions.at(-1).image"
              :created-at="versions.at(-1).createdAt"
              :tags="versions.at(-1).tags"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-overlay>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import {
    BCol,
    BContainer,
    BRow,
    BSpinner,
    BButton,
    BOverlay,
  } from "bootstrap-vue";
  import RecipeCard from "@/components/RecipeCard";
  import { Actions, Getters } from "@/store/modules/recipes/types";
  import { DataStatus } from "@/enums";
  import { RouteName } from "@/router/enums";
  import { recipesModuleName } from "@/store/modules";

  export default {
    components: {
      BContainer,
      BRow,
      BCol,
      RecipeCard,
      BSpinner,
      BButton,
      BOverlay,
    },
    data() {
      return {
        createRecipePageLink: {
          name: RouteName.CREATE_RECIPE,
        },
      };
    },
    computed: {
      ...mapState(recipesModuleName, ["recipes", "dataStatus"]),
      ...mapGetters(recipesModuleName, {
        isLoading: Getters.IS_LOADING,
      }),
      isRecipesListEmpty() {
        return this.recipes.length === 0;
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
