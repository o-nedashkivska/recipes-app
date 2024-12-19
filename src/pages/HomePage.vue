<template>
  <InfoHeading title="Cookbook" subtitle="Hierarchical tree of recipes">
    <b-button variant="warning" :to="recipesPageLink" class="mr-3">
      Explore recipes
    </b-button>
    <b-button variant="success" :to="createRecipePageLink">
      Create new recipe
    </b-button>
  </InfoHeading>
</template>

<script>
  import { BButton } from "bootstrap-vue";
  import InfoHeading from "@/components/common/InfoHeading";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      BButton,
      InfoHeading,
    },
    data() {
      return {
        recipesPageLink: {
          name: RouteName.RECIPES,
        },
        createRecipePageLink: {
          name: RouteName.CREATE_RECIPE,
        },
      };
    },
  };
</script>
