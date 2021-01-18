<template>
  <div class="naslovna">
    <div class="redovi">
      <div class="red">
        <a class="fa fa-plus-circle fa-lg facss" href="/PostForm"></a>
      </div>
      <div class="red facss">NASLOVNA</div>
      <div class="red facss">
        <a href="#" @click.prevent="logout()">Logout</a>
      </div>
    </div>

    <div class="post">
      <card v-for="(card, drac) in cards" :key="drac" :info="card" />
    </div>
  </div>
</template>
<script>
import Card from "@/components/Post.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";
import { db } from "@/firebase";

export default {
  name: "naslovna",
  data() {
    return {
      cards: [],
      store,
      newPostOpis: "",
      newPostGame: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    postNewImage() {
      const postGame = this.newPostGame;
      const postOpis = this.newPostOpis;

      db.collection("posts")
        .add({
          option: postGame,
          desc: postOpis,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newPostGame = "";
          this.newPostOpis = "";
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getPosts() {
      console.log("firebase dohvat...");

      db.collection("posts")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const data = doc.data();
            console.log(data);

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              option: data.option,
            });
          });
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
  components: {
    Card,
  },
};
</script>