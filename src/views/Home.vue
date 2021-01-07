<template>
  <div class="home">
    <div class="redovi">
      <div class="red"></div>
      <div class="red">DRUŽENJA</div>
      <div class="red"><a href="#" @click.prevent="logout()">Logout</a></div>
      <div class="container">
      </div>
    </div>
    <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
       <card v-for="card in cards" :key="card" :info="card"/>
    </div>
    <div class="col-sm">
      One of three columns
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
  
'@/assets/drustvene_igre.png',
'@/assets/vanjske_aktivnosti.jpg',
'@/assets/cuganja.png',
'@/assets/sportovi.jpg',
'@/assets/online.jpg',
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
