import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./views/router";
import store from "./store/store";
import lms from "./store/lms";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(lms);
app.mount("#app");
