<template>
  <b-navbar toggleable="lg" type="dark" variant="success" sticky>
    <b-navbar-brand :to="homePageLink">Cookbook</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="recipesPageLink">All Recipes</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
  } from "bootstrap-vue";
  import { RouteName } from "@/router/enums";

  export default {
    components: {
      BNavbar,
      BNavbarBrand,
      BNavbarToggle,
      BCollapse,
      BNavbarNav,
      BNavItem,
    },
    data() {
      return {
        homePageLink: {
          name: RouteName.HOME,
        },
        recipesPageLink: {
          name: RouteName.RECIPES,
        },
      };
    },
  };
</script>
