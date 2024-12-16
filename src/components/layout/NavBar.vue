<template>
  <b-navbar toggleable="lg" type="dark" variant="success" sticky>
    <b-navbar-brand to="/">Cookbook</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/recipes">All Recipes</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
