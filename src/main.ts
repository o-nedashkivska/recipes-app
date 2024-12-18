import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./assets/main.css";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
