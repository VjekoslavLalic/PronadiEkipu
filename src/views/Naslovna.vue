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
        <button
          type="button"
          class="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Open Modal
        </button>

        <h2>Ponudi druženje</h2>
        <div class="form-box">
          <select class="custom-select" v-model="newPostGame" id="postGame">
            <option selected>Odaberi druženje</option>
            <option
              value="https://firebasestorage.googleapis.com/v0/b/pronadiekipu.appspot.com/o/covjece_ne_ljuti_se.png?alt=media&token=bc29492d-317c-4bdb-93fc-05b891c16948"
            >
              Čovječe ne ljuti se
            </option>
            <option
              value="https://firebasestorage.googleapis.com/v0/b/pronadiekipu.appspot.com/o/uno.png?alt=media&token=ab1bc8bb-92dc-47ee-ad75-f735cbf93693"
            >
              Uno
            </option>
            <option
              value="https://firebasestorage.googleapis.com/v0/b/pronadiekipu.appspot.com/o/belot.png?alt=media&token=510d414d-c43c-4d9a-89c7-5b46e8b3540b"
            >
              Belot
            </option>
            <option
              value="https://firebasestorage.googleapis.com/v0/b/pronadiekipu.appspot.com/o/poker.png?alt=media&token=e11f2d80-44fe-4825-a71d-df3c9a98f9bb"
            >
              Poker
            </option>
            <option
              value="https://firebasestorage.googleapis.com/v0/b/pronadiekipu.appspot.com/o/briskula.png?alt=media&token=0c96d5f6-0208-4241-baa1-69bc83c5f3ac"
            >
              Briškula
            </option>
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