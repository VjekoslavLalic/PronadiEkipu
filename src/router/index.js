import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    //meta: {
    //needsUser: true,
    //},
  },
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import( '../views/Signup.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import( '../views/profil.vue')
  },
  {
    path: '/Drustvene_igre',
    name: 'Drustvene_igre',
    component: () => import('../views/Drustvene_igre.vue')
  },
  {
    path: '/Vanjske_aktivnosti',
    name: 'Vanjske_aktivnosti',
    component: () => import('../views/Vanjske_aktivnosti.vue')
  },
  {
    path: '/Cuganja',
    name: 'Cuganja',
    component: () => import( '../views/Cuganja.vue')
  },
  {
    path: '/Sportovi',
    name: 'Sportovi',
    component: () => import('../views/Sportovi.vue')
  },
  {
    path: '/Online',
    name: 'Online',
    component: () => import('../views/Online.vue')
  },
  {
    path: '/Naslovna',
    name: 'Naslovna',
    component: () => import( '../views/Naslovna.vue')
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import( '../views/Chat.vue')
  },
  {
    path: '/nudim_trazim',
    name: 'nudim_trazim',
    component: () => import( '../views/nudim_trazim.vue')
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/*router.beforeEach((to, from, next) => {
  console.log("Stara ruta", from.name, " -> ", "nova ruta", to.name, "korisnik", store.currentUser)

  const noUser = store.currentUser === null;

  if (noUser && to.meta.needsUser) {
    next('/');
  }
  else {
    next();
  }

});
*/


export default router
