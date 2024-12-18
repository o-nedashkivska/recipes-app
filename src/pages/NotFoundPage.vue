<template>
  <InfoHeading title="Not Found" subtitle="Page was not found">
    <b-button variant="warning" :to="homePageLink"
      >Return to main page</b-button
    >
  </InfoHeading>
</template>

<script>
  import { BButton } from "bootstrap-vue";
  import InfoHeading from "@/components/common/InfoHeading";
  import { RoutePath } from "@/router/enums";

  export default {
    components: {
      BButton,
      InfoHeading,
    },
    data() {
      return {
        homePageLink: RoutePath.HOME,
      };
    },
  };
</script>
