<template>
  <b-modal :id="id" title="Edit Recipe" hide-footer centered>
    <RecipeForm :recipe="recipe" />
  </b-modal>
</template>

<script>
  import { BModal } from "bootstrap-vue";
  import RecipeForm from "@/components/RecipeForm";
  import { Getters } from "@/store/enums";

  export default {
    components: {
      BModal,
      RecipeForm,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      recipeId: {
        type: String,
        required: true,
      },
    },
    computed: {
      recipe() {
        return this.$store.getters[Getters.GET_RECIPE_BY_ID](this.recipeId);
      },
    },
  };
</script>
