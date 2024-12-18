<template>
  <div class="container">
    <h2 class="mb-3">New Recipe</h2>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
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
          required
        />
      </b-form-group>

      <div class="d-flex justify-content-end buttons">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="success">Submit</b-button>
      </div>
    </b-form>
  </div>
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
  import { Mutations } from "@/store/enums";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      BForm,
      BFormGroup,
      BFormInput,
      BFormSelect,
      BFormTextarea,
      BButton,
    },
    data() {
      return {
        form: {
          title: "",
          category: "",
          tagList: [],
          image: "",
          instructions: "",
        },
        show: true,
      };
    },
    computed: {
      ...mapState(["categories", "tags"]),
    },
    methods: {
      onSubmit() {
        this.$store.commit(Mutations.ADD_RECIPE, this.form);
        this.$router.push({ name: RouteName.RECIPES });
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
  .container {
    max-width: 600px;
    padding: 0 30px;
  }
  .buttons {
    gap: 10px;
  }
</style>
