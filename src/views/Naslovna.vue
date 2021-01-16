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
    <div class="form-container">
      <form action="#" class="form-wrap" method="POST">
        <h2>Ponudi druženje</h2>
        <div class="form-box">
          <select class="custom-select">
            <option selected>Odaberi druženje</option>
            <option value="1">Čovječe ne ljuti se</option>
            <option value="2">Uno</option>
            <option value="3">Belot</option>
          </select>
        </div>
        <div class="form-box">
          <textarea rows="25" cols="10" placeholder="Opiši druženje"></textarea>
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
    // v-model se uvijek veže na atribute iz data dijela
    return {
      cards: [], //premjestili smo jer idemo raditi lokalno ne statično
      store,
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  //prilikom prikazivanja ove komponente moramo dovući postavke iz firebasea
  //sad je pitanje kad dolazi komponenta na red za to koristimo mounted metodu onda nam pokaziva točan trenutak kada nam komponenta dolazi na red

  mounted() {
    //sada u tom trenutku ide dohvat iz firebasea  a za taj dohvat stavljamo metodu get posts da bude kod čišći i pregledniji i pozivamo metodu
    this.getPosts(); //1. radnja itd
  },
  methods: {
    getPosts() {
      //drugi razlog zašto je get posts izdvojen u methods je taj da kad god pozovem metodu getPosts želim da mi se osvježe postovi, kada to radimo? Radimo prilikom brisanja nekog posta ili dodavanja nekog posta, htjet ćemo osvježiti podatke iz firestorea odnosno imat ćemo "svježe stanje".

      //sad gledamo u firebase API koja nam metoda treba za dohvat nečega iz kolekcija
      //krećemo sa objektom firestore odnosno odaberemo javascript i idemo na firestore zašto ? zato jer smo krenuli sa firestorom koji nam je dao db to se nalazi pod firebase.js fileu db je instanca firestorea onda gledamo koje metode imamo i prvo sto pozivam je collection#1
      console.log("firebase dohvat...");

      db.collection("posts") //#1 onda navodim koij collection pristupam i sada kad sam dohvatio kolekciju pogledam pod collection i vidim da dobivam collection reference idem na to i vidim sta on poodržava  i vidim da podržava ad  sto smo koristili orije i vidim da ima get sto cemo sad koristit ima cak i orderby ima limit sto ce nam trebat otvaramo get  i vidimo on vraća promise njega pozivamo bez posebnih parametara ako vraća promis moramo ici .then i u taj promise vraćamo funkciju  then prima querysnapshot query je instanca query snapshota  query ima metodu for each kliknem na nju i vidim da on treba callback to znači da u for each ide nova funkcija u kojoj će biti dokument a doc je querydocument snapshot on ima metodu data i propertie id  doc.id kad pristupam propertio+u nepozivam ga kao funkciju
        .get()
        .then((query) => {
          query.forEach((doc) => {
            //u svakom trenutku pozivanja doc nam gleda jeda po jedan dokument a pristupamo sa query
            this.cards = []; //praznimo cards ako se vise puta pozove ovosve
            const data = doc.data();
            console.log(data);

            this.cards.push({
              //this je klasicna metoda za dodavanje u array
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
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
    postNewImage() {
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      db.collection("posts") //spremamo u kolekciju posts
        .add({
          //add metoda vraća promise zato cemo nakraju imat then i catch
          //add prima parametar kao objekt
          url: imageUrl, //atributi koji su nam potrebni
          desc: imageDescription,
          email: store.currentUser, //email nam se nalazi u store ono currentUSER :NULL;
          posted_at: Date.now(), //Date je ugrađen objekt i nemora se importat a u njemu imamo ugrađenu metodu now ralun aono od datuma do sada koliko je prošlo ...
        })
        .then((doc) => {
          //funkcija za uspijeh
          //then je metoda
          //ako dođe do uspiješnog spremanja :)
          console.log("Spremljeno", doc); //ako sam dovde dosao znaci sve je uspijesno i onda brisemo sadržaj koji jeu data dijelu sa ovim this.newimagedescription="";
          this.newImageDescription = "";
          this.newImageUrl = "";
        })
        .catch((e) => {
          //funkcija za grešku
          //catch je metoda ona sadrži funkciju za grešku
          console.error(e);
        });
    },
  },
  components: {
    Card,
  },
};
</script>