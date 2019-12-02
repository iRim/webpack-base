import Vue from "vue";
import store from "../../vue/store";

import "./js/common";
import "./scss/main.scss";

window.Vue = Vue;
Vue.component("component", require("../../vue/components/main.vue").default);

new Vue({
  store,
  data() {
    return {
      component: false
    };
  },
  el: "#app"
});
