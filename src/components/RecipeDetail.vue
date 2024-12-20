<template>
  <div v-if="recipe">
    <b-card no-body class="overflow-hidden recipe-detail">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="recipe.image" alt="Image" class="rounded-0" />
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
              >
                {{ tag }}
              </b-badge>
            </b-card-text>
            <b-card-text>
              <strong>Instructions:</strong>
            </b-card-text>
            <b-card-text
              v-for="(instruction, index) in recipe.instructions.split('\r\n')"
              :key="index"
            >
              {{ index + 1 }}. {{ instruction }}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import {
    BCard,
    BCardText,
    BBadge,
    BRow,
    BCol,
    BCardImg,
    BCardBody,
  } from "bootstrap-vue";
  import { RouteName } from "@/router/enums";
  import { Getters } from "@/store/modules/recipes/types";
  import { recipesModuleName } from "@/store/modules";

  export default {
    components: { BCard, BRow, BCol, BCardImg, BCardBody, BCardText, BBadge },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters(recipesModuleName, {
        getRecipe: Getters.GET_RECIPE_BY_ID,
      }),
      recipe() {
        const recipe = this.getRecipe(this.id);

        if (!recipe) {
          this.$router.replace({ name: RouteName.NOT_FOUND });
        }

        return recipe;
      },
    },
  };
</script>

<style scoped>
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
