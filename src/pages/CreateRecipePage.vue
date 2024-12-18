<template>
  <div class="container">
    <h2 class="mb-3">New Recipe</h2>
    <RecipeForm />
  </div>
</template>

<script>
  import RecipeForm from "@/components/RecipeForm";

  export default {
    components: {
      RecipeForm,
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    padding: 0 30px;
  }
</style>
