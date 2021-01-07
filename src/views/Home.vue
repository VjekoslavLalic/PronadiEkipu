<template>
  <div class="home">
    <div class="redovi">
      <div class="red"></div>
      <div class="red">DRUŽENJA</div>
      <div class="red"><a href="#" @click.prevent="logout()">Logout</a></div>
      </div>
    <div class="container">
  <div class="row">
    <div class="col-12">
      
       <card v-for="card in cards" :key="card" :info="card"/>
    </div>
  
  </div>
</div>
  </div>
</template>



<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";

let cards = [];

cards=[
  
require("@/assets/drustvene_igre.png"),
require("@/assets/vanjske_aktivnosti.jpg"),
require("@/assets/cuganja.png"),
require("@/assets/sportovi.jpg"),
require("@/assets/online.jpg"),
];


export default {
  name: "Home",
  data() {
    return {
      store,
      cards,
    };
  },
  components: {
    Card,
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>
