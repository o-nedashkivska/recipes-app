<template>
  <b-navbar toggleable="lg" type="dark" variant="success" sticky>
    <b-navbar-brand :to="homePageLink">
      <b-img src="/favicon.png" height="40" />
      Cookbook
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="recipesPageLink">All Recipes</b-nav-item>
        <b-nav-item :to="createRecipePageLink">Create Recipe</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import {
    BNavbar,
    BNavbarBrand,
    BImg,
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
      BImg,
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
        createRecipePageLink: {
          name: RouteName.CREATE_RECIPE,
        },
      };
    },
  };
</script>
