<template>
  <InfoHeading title="Not Found" subtitle="Page was not found">
    <b-button variant="warning" :to="homePageLink"
      >Return to main page</b-button
    >
  </InfoHeading>
</template>

<script>
  import InfoHeading from "@/components/common/InfoHeading";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      InfoHeading,
    },
    data() {
      return {
        homePageLink: RouteName.HOME,
      };
    },
  };
</script>
