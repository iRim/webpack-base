import Vue from "vue";

import "./js/common";
import "./scss/main.scss";

window.Vue = Vue;
Vue.component("example", require("./vue/components/main.vue").default);
