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
          <osoba v-for="(Osoba, drac) in cards" :key="drac" :profile="Osoba" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
import Osoba from "@/components/Osoba.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";

let cards = [];

cards = [
  {
    image: require("@/assets/Marko.png"),
    name: "Marko Matičević",
    description: "Marko iz Pule, 20 godina",
  },
    {
    image: require("@/assets/Ana.png"),
    name: "Ana Sučić",
    description: "Ana iz Dubrovnika, 25 godina",
  },
    {
    image: require("@/assets/Petra.png"),
    name: "Petra Brekalo",
    description: "Petra iz Zadra, 24 godine",
  },
];
//proba
//function imgRedirect(destination) {
// location.href = destination;}
export default {
  name: "nudim_trazim",
  data() {
    return {
      store,
      cards,
    };
  },
  components: {
    Osoba,
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
