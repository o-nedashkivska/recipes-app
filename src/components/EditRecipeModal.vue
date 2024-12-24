<template>
  <b-modal
    :visible="isVisible"
    title="Edit Recipe"
    hide-footer
    centered
    @hide="$emit('hide-modal')"
  >
    <RecipeForm
      :id="id"
      :last-recipe-version="lastRecipeVersion"
      :on-success="onSuccess"
    />
  </b-modal>
</template>

<script>
  import { BModal } from "bootstrap-vue";
  import RecipeForm from "@/components/RecipeForm";

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
      lastRecipeVersion: {
        type: Object,
        required: true,
      },
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onSuccess() {
        this.$emit("hide-modal");
      },
    },
  };
</script>
