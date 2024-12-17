<template>
  <InfoHeading title="Cookbook" subtitle="Hierarchical tree of recipes">
    <b-button variant="warning" :to="recipesPageLink">Explore recipes</b-button>
  </InfoHeading>
</template>

<script>
import InfoHeading from "@/components/common/InfoHeading.vue";
import { RouteName } from "@/router/enums";

export default {
  components: {
    InfoHeading,
  },
  data() {
    return {
      recipesPageLink: RouteName.RECIPES,
    };
  },
};
</script>
