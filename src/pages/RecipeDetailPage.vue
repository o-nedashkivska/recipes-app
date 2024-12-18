<template>
  <RecipeDetail :id="id" />
</template>

<script>
  import RecipeDetail from "@/components/RecipeDetail";

  export default {
    components: {
      RecipeDetail,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
  };
</script>
