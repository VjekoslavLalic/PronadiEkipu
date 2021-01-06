<template>
  <div id="app">
    <router-view />
    <!-- Tabs navs -->
    <div v-if="store.currentUser">
      <ul
      class="nav nav-tabs mb-3"
      id="ex1"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active"
          id="ex1-tab-1"
          data-mdb-toggle="tab"
          href="#ex1-tabs-1"
          role="tab"
          aria-controls="ex1-tabs-1"
          aria-selected="true"
          >Druženja</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a
          class="nav-link"
          id="ex1-tab-2"
          data-mdb-toggle="tab"
          href="#ex1-tabs-2"
          role="tab"
          aria-controls="ex1-tabs-2"
          aria-selected="false"
          >Naslovna</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          color="black"
          to="/profil"
          class="nav-link"
          id="ex1-tab-3"
          data-mdb-toggle="tab"
          role="tab"
          aria-selected="false"
          >Profil</router-link
        >
      </li>
    </ul>
    <!-- Tabs navs -->

    <!-- Tabs content -->
    <div class="tab-content" id="ex1-content">
      <div
        class="tab-pane fade show active"
        id="ex1-tabs-1"
        role="tabpanel"
        aria-labelledby="ex1-tab-1"
        <card v-for="card in cards" :key="card" :info="card"/>
      >
        Tab 1 content
      </div>
      <div
        class="tab-pane fade"
        id="ex1-tabs-2"
        role="tabpanel"
        aria-labelledby="ex1-tab-2"
      >
        Tab 2 content
      </div>
      <div
        class="tab-pane fade"
        id="ex1-tabs-3"
        role="tabpanel"
        aria-labelledby="ex1-tab-3"
      >
        Tab 3 content
      </div>
    </div>
      </div
    <!-- Tabs content -->
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";
import router from "@/router";

let cards = [];

cards=[
"../assets/drustvene_igre.png",
"../assets/vanjske_aktivnosti.jpg",
"../assets/cuganja.png",
"../assets/sportovi.jpg",
"../assets/online.jpg",
];

export default {
  name: "app",
  data() {
    return {
      store,
      cards,
    };
  },
  components: {
    Card,
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
