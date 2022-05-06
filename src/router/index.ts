import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home.vue";
import { useGlobalStore } from '../stores/globalStore';

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: ["/home"],
    name: "Psychoanalysis of Nurture by Porter Robinson",
    component: Home,
    meta: {}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const toTitleStr = to.name as string;
  document.title = toTitleStr;
  next();
});

export default router;
