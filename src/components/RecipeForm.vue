<template>
  <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <b-form-group label="Title:" label-for="title">
      <b-form-input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="Enter meal title"
        required
      />
    </b-form-group>

    <b-form-group label="Category:" label-for="category">
      <b-form-select
        id="category"
        v-model="form.category"
        :options="categories"
        required
      />
    </b-form-group>

    <b-form-group label="Image URL:" label-for="image">
      <b-form-input
        id="image"
        v-model="form.image"
        placeholder="Enter image url"
      />
    </b-form-group>

    <b-form-group label="Instructions:" label-for="instructions">
      <b-form-textarea
        id="instructions"
        v-model="form.instructions"
        placeholder="Enter recipe instructions"
        rows="5"
        max-rows="10"
        no-resize
        required
      />
    </b-form-group>

    <div class="d-flex justify-content-end buttons">
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="success">Submit</b-button>
    </div>
  </b-form>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BButton,
  } from "bootstrap-vue";
  import { Actions } from "@/store/modules/recipes/types";
  import { recipesModuleName } from "@/store/modules";

  export default {
    components: {
      BForm,
      BFormGroup,
      BFormInput,
      BFormSelect,
      BFormTextarea,
      BButton,
    },
    props: {
      id: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      category: {
        type: String,
        default: "",
      },
      instructions: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
      tagsList: {
        type: Array,
        default: () => [],
      },
      onSuccess: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        form: {
          title: this.title,
          category: this.category,
          tags: this.tagList,
          image: this.image,
          instructions: this.instructions,
        },
      };
    },
    computed: {
      ...mapState(recipesModuleName, ["categories", "tags"]),
    },
    methods: {
      ...mapActions(recipesModuleName, {
        updateRecipe: Actions.UPDATE_RECIPE,
        addRecipe: Actions.ADD_RECIPE,
      }),
      onSubmit() {
        if (this.id) {
          this.updateRecipe({
            ...this.form,
            id: this.id,
          });
        } else {
          this.addRecipe(this.form);
        }

        if (this.onSuccess) {
          this.onSuccess();
        }
      },
      onReset() {
        this.form = {
          title: "",
          category: "",
          tagList: [],
          image: "",
          instructions: "",
        };
      },
    },
  };
</script>

<style scoped>
  .buttons {
    gap: 10px;
  }
</style>
