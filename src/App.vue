<template>
  <div id="app">
    <router-view />
    <div class="navbar" v-if="store.currentUser">
      <a class="facss" @click="routeHome()"
        ><img src="https://img.icons8.com/ios-filled/28/000000/friends.png"
      /></a>

      <!-- <a href="/Home">Home</a> -->

      <a @click="routeNaslovna()" class="fa fa-home fa-2x facss"></a>
      <a
        @click="routeProfil()"
        style="font-size: 25px"
        class="fa fa-user-circle fa-2x facss"
      ></a>
      <!-- <a href="/profil">Profil</a> -->
    </div>
    <!-- Tabs navs -->
  </div>
</template>
<script>
import { firebase } from "@/firebase.js";
import store from "@/store";
import router from "@/router";

firebase.auth().onAuthStateChanged(user => {
  const currentRoute = router.currentRoute; // citamo na kojoj smo ruti, router u sebi ima currentRoute atribut koji nam vraća jedan objekt trenutne rute ono sto ima name, component, meta i slicno to je ono pod router/index.js sto smo definirali za svaku rutu

  if (user) {
    console.log("***", user.email);
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    } else {
      // Korisnik nije ulogiran
      console.log("*** No user");
      store.currentUser = null;

      if (currentRoute.meta.needsUser) {
        router.push({ name: "Pocetna" });
      }

      //ovo ce morat biti ovdje
      /* if (router.name !== "Login") {
      router.push({ name: "Login" });
    } */
    }
  }
});
export default {
  name: "app",
  data() {
    return {
      store
    };
  },
  methods: {
    routeNaslovna() {
      router.push({ name: "Naslovna" });
    },
    routeHome() {
      router.push({ name: "Home" });
    },
    routeProfil() {
      router.push({ name: "profil" });
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: white !important;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
