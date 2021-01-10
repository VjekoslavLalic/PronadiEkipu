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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/profil.vue')
  },
  {
    path: '/Drustvene_igre',
    name: 'Drustvene_igre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Drustvene_igre.vue')
  },
  {
    path: '/Vanjske_aktivnosti',
    name: 'Vanjske_aktivnosti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Vanjske_aktivnosti.vue')
  },
  {
    path: '/Cuganja',
    name: 'Cuganja',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cuganja.vue')
  },
  {
    path: '/Naslovna',
    name: 'naslovna',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Naslovna.vue')
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
