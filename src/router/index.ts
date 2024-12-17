import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/recipes",
      name: "recipes",
      // route level code-splitting
      // this generates a separate chunk (RecipesPage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/pages/RecipesPage.vue"),
    },
    {
      path: "/recipes/:id",
      props: true,
      component: () => import("@/pages/RecipeDetailPage.vue"),
    },
    {
      path: "*",
      beforeEnter: (_to, _from, next) => {
        next("/404");
      },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
