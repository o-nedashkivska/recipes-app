<template>
  <b-jumbotron
    :header="title"
    :lead="subtitle"
    class="heading"
    bg-variant="white"
  >
    <slot />
  </b-jumbotron>
</template>

<script>
  import { BJumbotron } from "bootstrap-vue";

  export default {
    components: {
      BJumbotron,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .heading {
    width: 50%;
    min-width: 350px;
    margin: 0 auto;
  }
</style>
