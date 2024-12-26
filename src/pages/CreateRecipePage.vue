<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mt-5">
      <b-spinner variant="success" class="spinner" />
    </div>
    <div v-else class="container">
      <h2 class="mb-3">New Recipe</h2>
      <RecipeForm :default-parent="parent" :on-success="onSuccess" />
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  import { BSpinner } from "bootstrap-vue";
  import RecipeForm from "@/components/RecipeForm";
  import { recipesModuleName } from "@/store/modules";
  import { Getters, Actions } from "@/store/modules/recipes/types";
  import { RouteName } from "@/router/enums";
  import { DataStatus } from "@/enums";

  export default {
    components: {
      RecipeForm,
      BSpinner,
    },
    props: {
      parent: {
        type: String,
        default: null,
      },
    },
    computed: {
      ...mapState(recipesModuleName, ["dataStatus"]),
      ...mapGetters(recipesModuleName, {
        isLoading: Getters.IS_LOADING,
      }),
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
      onSuccess() {
        this.$router.push({ name: RouteName.RECIPES });
      },
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    padding: 30px 30px 0;
  }
  .spinner {
    width: 100px;
    height: 100px;
  }
</style>
