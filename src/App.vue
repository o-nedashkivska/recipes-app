<template>
  <div>
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
  import NavBar from "@/components/layout/NavBar";

  export default {
    components: { NavBar },
  };
</script>
