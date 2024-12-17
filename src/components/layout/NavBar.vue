<template>
  <b-navbar toggleable="lg" type="dark" variant="success" sticky>
    <b-navbar-brand :to="homePageLink">Cookbook</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="recipesPageLink">All Recipes</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import { RouteName } from "@/router/enums";

  export default {
    data() {
      return {
        homePageLink: RouteName.HOME,
        recipesPageLink: RouteName.RECIPES,
      };
    },
  };
</script>
