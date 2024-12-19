import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import { RouteName, RoutePath } from "./enums";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: RoutePath.HOME,
      name: RouteName.HOME,
      component: HomePage,
    },
    {
      path: RoutePath.RECIPES,
      name: RouteName.RECIPES,
      // route level code-splitting
      // this generates a separate chunk (RecipesPage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/pages/RecipesPage.vue"),
    },
    {
      path: `${RoutePath.RECIPES}/:id`,
      props: true,
      component: () => import("@/pages/RecipeDetailPage.vue"),
    },
    {
      path: RoutePath.CREATE_RECIPE,
      name: RouteName.CREATE_RECIPE,
      component: () => import("@/pages/CreateRecipePage.vue"),
    },
    {
      path: "*",
      beforeEnter: (_to, _from, next) => {
        next(RoutePath.NOT_FOUND);
      },
    },
    {
      path: RoutePath.NOT_FOUND,
      name: RouteName.NOT_FOUND,
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
