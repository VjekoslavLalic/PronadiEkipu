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
          <card v-for="(card, drac) in cards" :key="drac" :info="card" />
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

cards = [
  {
    img: require("@/assets/drustvene_igre.png"),
    description: "Društvene igre",
    page: "/Drustvene_igre",
  },
  {
    img: require("@/assets/vanjske_aktivnosti.jpg"),
    description: "Vanjske aktivnosti",
    page: "/Vanjske_aktivnosti"
  },
  { 
    img: require("@/assets/cuganja.png"),
    description: "Cuganja",
    page: "/Cuganja" 
    },
  { 
    img: require("@/assets/sportovi.jpg"), 
    description: "Sportovi",
    page: "/Sportovi"
    },
  { 
    img: require("@/assets/online.jpg"), 
    description: "Online",
    page: "/Online" 
    },
];
//proba
//function imgRedirect(destination) {
// location.href = destination;}
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
