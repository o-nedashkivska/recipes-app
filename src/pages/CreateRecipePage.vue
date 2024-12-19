<template>
  <div class="container">
    <h2 class="mb-3">New Recipe</h2>
    <RecipeForm :onSuccess="onSuccess" />
  </div>
</template>

<script>
  import RecipeForm from "@/components/RecipeForm";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      RecipeForm,
    },
    methods: {
      onSuccess() {
        this.$router.push({ name: RouteName.RECIPES });
      },
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    padding: 0 30px;
  }
</style>
