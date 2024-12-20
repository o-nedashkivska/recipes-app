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
      :title="title"
      :category="category"
      :instructions="instructions"
      :image="image"
      :tag-list="tagList"
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
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      tagList: {
        type: Array,
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
