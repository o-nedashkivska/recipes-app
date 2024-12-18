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
        <RecipeCard
          :id="recipe.id"
          :title="recipe.title"
          :category="recipe.category"
          :instructions="recipe.instructions"
          :image="recipe.image"
          :tags="recipe.tags"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { BCol, BContainer, BRow } from "bootstrap-vue";
  import RecipeCard from "@/components/RecipeCard";
  import { mapState } from "vuex";

  export default {
    components: {
      BContainer,
      BRow,
      BCol,
      RecipeCard,
    },
    computed: {
      ...mapState(["recipes"]),
    },
  };
</script>
