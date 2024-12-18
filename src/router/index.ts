import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import { RoutePath } from "./enums";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: RoutePath.HOME,
      name: "home",
      component: HomePage,
    },
    {
      path: RoutePath.RECIPES,
      name: "recipes",
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
      path: "*",
      beforeEnter: (_to, _from, next) => {
        next(RoutePath.NOT_FOUND);
      },
    },
    {
      path: RoutePath.NOT_FOUND,
      name: "404",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
