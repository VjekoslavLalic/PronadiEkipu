<template>
  <div class="naslovna">
    <div class="redovi">
      <div class="red"></div>
      <div class="red">NASLOVNA</div>
      <div class="red"><a href="#" @click.prevent="logout()">Logout</a></div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="postNewImage" class="form-inline mb-5">
            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input
                v-model="newImageUrl"
                type="text"
                class="form-control ml-2"
                placeholder="Enter the image URL"
                id="imageUrl"
              />
            </div>
            <div class="form-group">
              <label for="imageDescription">Description</label>
              <input
                v-model="newImageDescription"
                type="text"
                class="form-control ml-2"
                placeholder="Enter the image description"
                id="imageDescription"
              />
            </div>
            <button type="submit" class="btn btn-primary ml-2">
              Post image
            </button>
          </form>
          <card v-for="(card, drac) in cards" :key="drac" :info="card" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import { firebase } from "@/firebase.js";
import store from "@/store";
import { db } from "@/firebase";

/*cards = [
  {
    img: require("@/assets/covjece_ne_ljuti_se.png"),
    description: "Čovječe ne ljuti se",
  },
  { img: require("@/assets/uno.png"), description: "Uno" },
  { img: require("@/assets/belot.png"), description: "Belot" },
  { img: require("@/assets/poker.png"), description: "Poker" },
  { img: require("@/assets/briskula.png"), description: "Briškula" },
  { img: require("@/assets/kava.png"), description: "Kava" },
  { img: require("@/assets/setnja.png"), description: "Šetnja" },
  { img: require("@/assets/trcanje.png"), description: "Trčanje" },
  {
    img: require("@/assets/voznja_biciklom.png"),
    description: "Vožnja biciklom",
  },
  { img: require("@/assets/rolanje.png"), description: "Rolanje" },
  { img: require("@/assets/vani.png"), description: "Vani" },
  { img: require("@/assets/kod_kuce.png"), description: "Kod kuće" },
]; */

export default {
  name: "naslovna",
  data() {
    return {
      cards: [],
      store,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("firebase dohvat...");

      db.collection("posts")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.cards = [];
            const data = doc.data();
            console.log(data);

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
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
    postNewImage() {
      console.log("ok");

      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  components: {
    Card,
  },
};
</script>