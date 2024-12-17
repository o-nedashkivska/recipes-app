<template>
  <InfoHeading title="Not Found" subtitle="Page was not found">
    <b-button variant="warning" to="/">Return to main page</b-button>
  </InfoHeading>
</template>

<script>
import InfoHeading from "@/components/common/InfoHeading.vue";

export default {
  components: {
    InfoHeading,
  },
};
</script>
