<template>
  <div v-if="recipe">
    <b-card no-body class="overflow-hidden recipe-detail">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            :src="recipe.image"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="recipe.title">
            <b-card-text>Category: {{ recipe.category }}</b-card-text>
            <b-card-text v-if="recipe.tags">
              Tags:
              <b-badge
                v-for="tag in recipe.tags.split(',')"
                :key="tag"
                variant="warning"
                class="mr-1"
                >{{ tag }}</b-badge
              >
            </b-card-text>
            <b-card-text>
              <strong>Instructions:</strong>
            </b-card-text>
            <b-card-text
              v-for="(instruction, index) in recipe.instructions.split('\r\n')"
              :key="index"
              >{{ index + 1 }}. {{ instruction }}</b-card-text
            >
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { RouteName } from "@/router/enums";
import recipes from "@/data/recipes.json";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    recipe() {
      const recipe = recipes.find((recipe) => recipe.id === this.id);

      if (!recipe) {
        this.$router.replace(RouteName.NOT_FOUND);
      }

      return recipe;
    },
  },
};
</script>

<style>
.recipe-detail {
  width: 95%;
  min-width: 325px;
  margin: 0 auto;
  border: none;
}

@media (min-width: 991.98px) {
  .recipe-detail {
    width: 85%;
  }
}

@media (min-width: 1399.98px) {
  .recipe-detail {
    max-width: 1300px;
  }
}
</style>
