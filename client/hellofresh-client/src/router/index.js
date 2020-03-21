import Vue from 'vue'
import VueRouter from 'vue-router'
import search from '../components/searchbar.vue'
import card from '../components/recipeCard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: search
  },
  {
    path: '/card/:id',
    name: 'Card',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../components/recipeCard.vue')
    component: card
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
