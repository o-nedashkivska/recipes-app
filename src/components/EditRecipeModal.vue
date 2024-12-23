<template>
  <b-modal
    :visible="isVisible"
    title="Edit Recipe"
    hide-footer
    centered
    @hide="onHideModal"
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
      onHideModal: {
        type: Function,
        default: () => {},
      },
    },
    methods: {
      onSuccess() {
        this.onHideModal();
      },
    },
  };
</script>
