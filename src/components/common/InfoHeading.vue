<template>
  <b-jumbotron
    :header="title"
    :lead="subtitle"
    class="heading"
    bg-variant="white"
  >
    <slot></slot>
  </b-jumbotron>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
};
</script>

<style>
.heading {
  width: 50%;
  min-width: 350px;
  margin: 0 auto;
}
</style>
