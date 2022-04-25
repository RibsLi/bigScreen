import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('views/home/Home.vue')
const Test = () => import('views/test/Test.vue')
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;