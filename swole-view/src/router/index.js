import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import('../views/Exercise.vue')
  },
  {
    path: '/finish',
    name: 'Finish',
    component: () => import('../views/Finish.vue')
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFound")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
