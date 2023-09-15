import { createRouter, createWebHistory } from "vue-router";
// components
import Main from "@/components/layout/main/Main.vue";
// dictionary
import RoomCategory from "@/views/tenant/dictionary/roomCategory/RoomCategory.vue";
import Room from "@/views/tenant/dictionary/room/Room.vue";
import ServiceCategory from "@/views/tenant/dictionary/serviceCategory/ServiceCategory.vue";
// action
import Renting from "@/views/tenant/action/renting/Renting.vue";
// others
import LoginVue from "@/views/authentication/Login.vue";
import NotFound from "@/pages/NotFound.vue";
import RouterTest from "@/views/test/Router.vue";
// Resources
import i18nLayout from "@/i18n/components/i18nLayout";

// init routes
const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: i18nLayout.LeftNav.RoomCategory,
        name: i18nLayout.LeftNav.RoomCategory,
        component: RoomCategory,
      },
      {
        path: i18nLayout.LeftNav.Room,
        name: i18nLayout.LeftNav.Room,
        component: Room,
      },
      {
        path: i18nLayout.LeftNav.Service,
        name: i18nLayout.LeftNav.Service,
        component: ServiceCategory,
      },
      {
        path: i18nLayout.LeftNav.Renting,
        name: i18nLayout.LeftNav.Renting,
        component: Renting,
      },
    ],
  },
  {
    path: "/login",
    component: LoginVue,
  },
  {
    path: "/route/:id",
    component: RouterTest,
    name: "route-test", // Tránh TH thay đổi path dẫn đến phải thay đổi tại router link
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
