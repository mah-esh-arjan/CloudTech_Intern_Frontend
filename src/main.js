import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./views/router";
import store from "./store/store";
import lms from "./store/lms";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faShoppingCart);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(lms);
app.mount("#app");
