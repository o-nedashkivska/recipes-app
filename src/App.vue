<template>
  <div>
    <NavBar />
    <main id="app">
      <router-view />
    </main>
  </div>
</template>

<script>
  import NavBar from "@/components/layout/NavBar.vue";

  export default {
    components: { NavBar },
  };
</script>

<style>
  #app {
    padding: 30px 0;
  }
</style>
