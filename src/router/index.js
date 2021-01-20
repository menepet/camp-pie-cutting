import { createWebHistory, createRouter } from "vue-router"

const routes = [
  {
    path: "/",
    name: "FillParticipants",
    component: () => import('../components/fillParticipants.vue'),
  },
  {
    path: "/pie",
    name: "Pie",
    component: () => import('../components/pie.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
