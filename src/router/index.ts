import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store/index'
import Home from '@/views/Home.vue'

const store = useStore()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'Manage',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Manage.vue'),
  },
  {
    path: '/song/:id',
    name: 'Song',
    component: () => import('@/views/Song.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/404.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: 'text-yellow-500',
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.matched.some(record => record.meta.requiresAuth)) {
    return next()
  }

  if(store.state.isLoggedIn) {
    next()
  } else {
    next({ name: 'Home' })
  }

})

export default router
