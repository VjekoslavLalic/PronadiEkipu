<template>
  <div id="app">
    <router-view />
    <div class="navbar" v-if="store.currentUser">
      <a class="facss" href="/Home"
        ><img src="https://img.icons8.com/ios-filled/28/000000/friends.png"
      /></a>

      <!-- <a href="/Home">Home</a> -->

      <a href="/Naslovna" class="fa fa-home fa-2x facss"></a>
      <a
        href="/profil"
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
  const currentRoute = router.currentRoute;

  //console.log("PROVJERA STANJA LOGINA!");
  if (user) {
    console.log("***", user.email);
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    } else {
      console.log("*** No user");
      store.currentUser = null;

      if (currentRoute.meta.needsUser) {
        router.push({ name: "/" });
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
    /*  logout() {
      firebase
        .auth()
        .signOuth()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    }, */
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
