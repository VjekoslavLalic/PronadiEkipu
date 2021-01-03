<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Odaberi druženje i upoznaj nove ljude!</a> 
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
    <router-view /></div>
</template>
<script>
import { firebase } from "@/firebase.js";
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("***", user.email);
  } else {
    console.log("*** No user");
  }
});

export default {
  name: "app",
  data() {
    return {};
  },
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
