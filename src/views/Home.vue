<template>
  <div class="home">
    <div class="redovi">
      <div class="red"></div>
      <div class="red">DRUŽENJA</div>
      <div class="red"><a href="#" @click.prevent="logout()">Logout</a></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";


export default {
  name: "Home",
  data() {
    return {
      store,
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
