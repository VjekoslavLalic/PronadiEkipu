<template>
  <div class="naslovna">
    <div class="redovi">
      <div class="red"></div>
      <div class="red">NASLOVNA</div>
      <div class="red"><a href="#" @click.prevent="logout()">Logout</a></div>
    </div>
    <div class="form-container">
      <form
        action="#"
        class="form-wrap"
        method="POST"
        @submit.prevent="postNewImage"
      >
        <h2>Ponudi druženje</h2>
        <div class="form-box">
          <select class="custom-select" v-model="newPostGame" id="postGame">
            <option selected>Odaberi druženje</option>
            <option value="Čovječe ne ljuti se">Čovječe ne ljuti se</option>
            <option value="Uno">Uno</option>
            <option value="Belot">Belot</option>
            <option value="Poker">Poker</option>
            <option value="Briškula">Briškula</option>
          </select>
        </div>
        <div class="form-box">
          <textarea
            rows="25"
            cols="10"
            placeholder="Opiši druženje"
            v-model="newPostOpis"
            type="text"
            id="postOpis"
          ></textarea>
        </div>
        <div class="form-submit">
          <input type="submit" value="Objavi" id="objavi" />
        </div>
      </form>
    </div>
    <card v-for="(card, drac) in cards" :key="drac" :info="card" />
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
      newPostImg: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    postNewImage() {
      const postGame = this.newPostGame;
      const postOpis = this.newPostOpis;
      const postImg = this.newPostImg;

      db.collection("posts")
        .add({
          option: postGame,
          desc: postOpis,
          email: store.currentUser,
          posted_at: Date.now(),
          img: postImg,
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
              img: data.postImg,
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