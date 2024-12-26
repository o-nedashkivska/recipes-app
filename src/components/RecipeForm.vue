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

    <b-form-group label="Parent Recipe:" label-for="parent">
      <b-form-select
        id="parent"
        v-model="form.parent"
        :options="parentOptions"
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
  import { getRecipeVersion } from "@/utils/get-recipe-version";

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
      defaultParent: {
        type: String,
        default: "",
      },
      lastRecipeVersion: {
        type: Object,
        default: () => ({}),
      },
      onSuccess: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        form: {
          ...this.lastRecipeVersion,
          parent: this.defaultParent || this.lastRecipeVersion.parent,
        },
      };
    },
    computed: {
      ...mapState(recipesModuleName, ["recipes", "categories", "tags"]),
      parentOptions() {
        return this.recipes
          .filter((recipe) => recipe.id !== this.id)
          .map((recipe) => ({
            value: recipe.id,
            text: getRecipeVersion(recipe, -1).title,
          }));
      },
    },
    methods: {
      ...mapActions(recipesModuleName, {
        updateRecipe: Actions.UPDATE_RECIPE,
        addRecipe: Actions.ADD_RECIPE,
      }),
      onSubmit() {
        if (this.id) {
          const updatedRecipe = {
            id: this.id,
          };

          const fields = [
            "title",
            "category",
            "image",
            "instructions",
            "parent",
          ];

          fields.forEach((field) => {
            if (this.lastRecipeVersion[field] !== this.form[field]) {
              updatedRecipe[field] = this.form[field];
            }
          });

          this.updateRecipe(updatedRecipe);
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
