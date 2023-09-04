import { createApp } from "vue";
import App from "./App.vue";
// global style
import "./assets/styles/global.css";
import "@/assets/styles/icon.css";
// resources
import router from "@/routers/router";
// library
// require("dotenv").config();
// vuex
import store from "./stores";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
