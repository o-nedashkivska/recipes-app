<template>
  <b-container>
    <b-row>
      <b-col
        v-for="recipe in recipes"
        :key="recipe.id"
        md="6"
        lg="4"
        xl="3"
        class="mb-4"
      >
        <RecipeCard v-bind="recipe" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import RecipeCard from "@/components/RecipeCard";
  import recipes from "@/data/recipes.json";

  export default {
    components: {
      RecipeCard,
    },
    data() {
      return { recipes };
    },
  };
</script>
