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
            <option value="1">Čovječe ne ljuti se</option>
            <option value="2">Uno</option>
            <option value="3">Belot</option>
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
          <input type="submit" value="Publish" />
        </div>
      </form>
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

  //ovo je statično jer smo ih ručno unijeli ne mijenjaju se tijekom izvođenja applikcijje 
]; */

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
    //computed: {
    // filteredCards() {
    //    let termin = this.store.searchTerm;
    //  return this.cards.filter((card) => card.description.includes(termin));},},

    postNewImage() {
      // sprema ono sto je korisnik unio u formu
      // sada kad ih imamo u data možemo ovo popuniti post game = cemu itd
      const postGame = this.newPostGame;
      const postOpis = this.newPostOpis;
      // i sada je bit da posaljemo varijable na firebase  da bi ostvarili komunikaciju sa firebaseom treba nam db varijabla i moramo ju importati kako bu ju koristili

      db.collection("posts")
        .add({
          option: postGame,
          desc: postOpis,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          //funkcija za uspijeh
          //then je metoda
          //ako dođe do uspiješnog spremanja :)
          console.log("Spremljeno", doc); //ako sam dovde dosao znaci sve je uspijesno i onda brisemo sadržaj koji jeu data dijelu sa ovim this.newimagedescription="";
          this.newPostGame = "";
          this.newPostOpis = "";
        })
        .catch((e) => {
          //funkcija za grešku
          //catch je metoda ona sadrži funkciju za grešku
          console.error(e);
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