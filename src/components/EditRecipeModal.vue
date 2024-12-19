<template>
  <b-modal
    :id="id"
    ref="edit-recipe-modal"
    title="Edit Recipe"
    hide-footer
    centered
  >
    <RecipeForm :recipe="recipe" :onSuccess="onSuccess" />
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
    methods: {
      onSuccess() {
        this.$refs["edit-recipe-modal"].hide();
      },
    },
  };
</script>
