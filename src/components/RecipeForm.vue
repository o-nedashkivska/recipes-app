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
  import { mapState } from "vuex";
  import {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BButton,
  } from "bootstrap-vue";
  import { Mutations } from "@/store/modules/recipes/enums";
  import { RouteName } from "@/router/enums";
  import { recipesModuleName } from "@/store";

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
      recipe: {
        default: null,
      },
      onSuccess: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        form: {
          title: this.recipe?.title ?? "",
          category: this.recipe?.category ?? "",
          tagList: this.recipe?.tagList ?? [],
          image: this.recipe?.image ?? "",
          instructions: this.recipe?.instructions ?? "",
        },
      };
    },
    computed: {
      ...mapState(recipesModuleName, ["categories", "tags"]),
    },
    methods: {
      onSubmit() {
        if (this.recipe?.id) {
          this.$store.commit(
            `${recipesModuleName}/${Mutations.UPDATE_RECIPE}`,
            {
              ...this.form,
              id: this.recipe.id,
            }
          );
        } else {
          this.$store.commit(
            `${recipesModuleName}/${Mutations.ADD_RECIPE}`,
            this.form
          );
        }

        if (this.onSuccess) {
          this.onSuccess();
        }
      },
      onReset() {
        this.form.title = "";
        this.form.category = "";
        this.form.tagList = [];
        this.form.image = "";
        this.form.instructions = "";
      },
    },
  };
</script>

<style scoped>
  .buttons {
    gap: 10px;
  }
</style>
