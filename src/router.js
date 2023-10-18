import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Dossier from "./views/Dossier.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "dashboard", component: Dashboard },
    { path: "/Accueil", name: "accueil", component: Dashboard },
    { path: "/Dossier", name: "dossier", component: Dossier },
  ],
});

export default router;
