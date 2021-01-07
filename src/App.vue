<template>
  <div id="app">
    <router-view />
    <div class="navbar" v-if="store.currentUser">
      <a href="/Home">Home</a>
      <a href="#">Naslovna</a>
      <a href="/profil">Profil</a>
    </div>
    <!-- Tabs navs -->
  </div>
</template>
<script>
import { firebase } from "@/firebase.js";
import store from "@/store";
import router from "@/router";

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("***", user.email);
    store.currentUser = user.email;
  } else {
    console.log("*** No user");
    store.currentUser = null;

    //if (router.name != "Login") {
    //router.push({ name: "Login" });}
  }
});
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
