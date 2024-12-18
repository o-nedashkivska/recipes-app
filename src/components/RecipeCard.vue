<template>
  <b-card :img-src="image" img-alt="Image" img-top class="h-100">
    <b-link :to="detailedPageLink">
      <b-card-title>{{ title }}</b-card-title>
    </b-link>
    <b-card-text>Category: {{ category }}</b-card-text>
    <b-card-text v-if="tags">
      Tags:
      <b-badge v-for="tag in tagList" :key="tag" variant="warning" class="mr-1">
        {{ tag }}
      </b-badge>
    </b-card-text>
    <template #footer>
      <small class="text-muted">Last updated 3 mins ago</small>
    </template>
  </b-card>
</template>

<script>
  import { BCard, BLink, BCardTitle, BCardText, BBadge } from "bootstrap-vue";

  export default {
    components: { BCard, BLink, BCardTitle, BCardText, BBadge },
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      tags: {
        type: String,
        default: null,
      },
    },
    computed: {
      detailedPageLink() {
        return "/recipes/" + this.id;
      },
      tagList() {
        return this.tags.split(",");
      },
    },
  };
</script>
