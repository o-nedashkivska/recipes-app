<template>
  <b-modal
    :visible="isVisible"
    title="Edit Recipe"
    hide-footer
    centered
    @close="onHideModal"
  >
    <RecipeForm :recipe="recipe" :on-success="onSuccess" />
  </b-modal>
</template>

<script>
  import { mapGetters } from "vuex";
  import { BModal } from "bootstrap-vue";
  import RecipeForm from "@/components/RecipeForm";
  import { Getters } from "@/store/modules/recipes/types";
  import { recipesModuleName } from "@/store/modules";

  export default {
    components: {
      BModal,
      RecipeForm,
    },
    props: {
      isVisible: Boolean,
      recipeId: {
        type: String,
        required: true,
      },
      onHideModal: {
        type: Function,
        default: () => {},
      },
    },
    computed: {
      ...mapGetters(recipesModuleName, {
        getRecipe: Getters.GET_RECIPE_BY_ID,
      }),
      recipe() {
        return this.getRecipe(this.recipeId);
      },
    },
    methods: {
      onSuccess() {
        this.onHideModal();
      },
    },
  };
</script>
