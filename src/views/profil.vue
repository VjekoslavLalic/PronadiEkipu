<template>
  <div class="profil">
    <div class="profilHeader">
      <div class="avatar" v-if="!showCroppa">
        <card v-for="(card, drac) in cards" :key="drac" :info="card" />

        <a @click.prevent="hideCroppa">Uredi</a>
      </div>
      <form
        class="md-form"
        method="POST"
        @submit.prevent="postNewImage"
        v-if="showCroppa"
      >
        <croppa
          id="croppaAvatar"
          :width="100"
          :height="100"
          placeholder="Učitaj sliku"
          v-model="imageReference"
        ></croppa>
        <div class="form-submit">
          <button type="submit" value="Objavi" id="objavi">Objavi</button>
          <!--<input type="submit" value="Objavi" id="objavi" />-->
        </div>
      </form>
      <!-- mb-4 -->
      <p contenteditable="true">
        {{ store.userDisplayName }}
      </p>
    </div>

    <div class="profilForma">
      <div class="profilPodaci">
        <div class="profilPodaci1">
          <p>Email:</p>
          <p>Spol:</p>
          <p>Godine:</p>
          <!-- / profilPodaci1 -->
        </div>
        <div class="profilPodaci2">
          <p>{{ store.userEmail }}</p>
          <input type="text" v-model="userSex" />
          <input type="text" v-model="userAge" />

          <!-- / profilPodaci2 -->
        </div>
        <!-- / profilPodaci -->
      </div>

      <!-- / profilForma -->
    </div>
    <form method="POST" @submit.prevent="postUserData">
      <div class="profilOpis">
        <p>Opis:</p>
        <textarea
          contenteditable="true"
          placeholder="Napišite nešto o sebi."
          rows="5"
          cols="50"
          v-model="userOpis"
        >
        </textarea>
      </div>
      <div class="form-submit">
        <button type="submit" value="Dodaj" id="dodaj">Dodaj</button>
      </div>
    </form>
    <UserInfo v-for="(card, drac) in userInfo" :key="drac" :info="card" />
  </div>
</template>


<script>
import store from "@/store";
import { firebase } from "@/firebase";
import router from "@/router";
import { db, storage } from "@/firebase";
import Card from "@/components/userData.vue";
import UserInfo from "../components/userInfo.vue";

firebase.auth().onAuthStateChanged((user) => {
  // const currentRoute = router.currentRoute;
  if (user) {
    // User is signed in.
    store.currentUser = user.email;

    /* console.log("emailVerified:" + user.emailVerified); */

    /* if (!currentRoute.meta.requiredUser && user.emailVerified) {
      router.push({ name: "Home" });
    }*/

    if (user.displayName) {
      store.userDisplayName = user.displayName;
    }
  } else {
    // No user is signed in.
    store.currentUser = null;

    /*   if (currentRoute.meta.requiredUser) {
      router.push({ name: "Login" });
    }*/
  }

  if (user.email) {
    store.userEmail = user.email;
  }

  if (user.phoneNumber) {
    store.userPhoneNumber = user.phoneNumber;
  }
});

export default {
  name: "profil",
  data() {
    return {
      store,
      cards: [],
      imageReference: null,
      userOpis: "",
      userAge: "",
      userSex: "",
      showCroppa: false,
      userInfo: [],
    };
  },
  mounted() {
    console.log("MOUNTED");
    this.getPosts();
    this.getUserData();
  },
  methods: {
    getUserData() {
      let collection = store.currentUser;
      console.log("firebase dohvat...");

      db.collection("userData")
        .doc(collection)
        .collection("podaci")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.userInfo = [];
            const data = doc.data();
            console.log(data);

            this.userInfo.push({
              godine: data.godine,
              spol: data.spol,
              opis: data.opis,
            });
          });
        });
    },
    hideCroppa() {
      this.showCroppa = !this.showCroppa;
    },

    getPosts() {
      console.log("firebase dohvat...");

      let collection = store.currentUser;

      db.collection(collection)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.cards = [];
            const data = doc.data();
            console.log(data);
            //i sada pristupamo cards i dodajemo sa metodom push novi objekt u kojem ovaj id time option...
            this.cards.push({
              //id: doc.id,
              img: data.url,
            });
          });
        });
    },
    //proba

    postUserData() {
      let collection = store.currentUser;
      const userOpis = this.userOpis;
      const userAge = this.userAge;
      const userSex = this.userSex;
      db.collection("userData")
        .doc(collection)
        .collection("podaci")
        .add({
          email: store.currentUser,
          opis: userOpis,
          spol: userSex,
          godine: userAge,
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.userOpis = "";
          this.userAge = "";
          this.userSex = "";
        })
        .catch((e) => {
          console.error(e);
        });
    },
    postNewImage() {
      let collection = store.currentUser;
      this.imageReference.generateBlob((blobData) => {
        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";

        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            // uspjesna linija
            result.ref
              .getDownloadURL()
              .then((url) => {
                db.collection(collection)
                  .add({
                    url: url,
                    email: store.currentUser,
                  })
                  .then((doc) => {
                    console.log("Spremljeno", doc);
                    this.imageReference.remove();
                    this.showCroppa = !this.showCroppa;
                    this.getPosts();
                  })
                  .catch((e) => {
                    console.error(e);
                  });

                var user = firebase.auth().currentUser;

                user
                  .updateProfile({
                    photoURL: url,
                  })
                  .then(() => {
                    store.profilePicture = user.photoURL;
                  })
                  .catch(function (error) {
                    console.error(e);
                  });
              })

              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            console.error(e);
          });
      });
    },
  },
  components: {
    Card,
    UserInfo,
  },
};
</script>

<style>
.profilForma {
  margin: 0px auto;
  display: flex;
  max-width: 750px;
  left: 0;
  right: 0;
}
.profilPodaci {
  margin: 0px auto;
  width: 100%;
  text-align: left;
  display: flex;
}
.profilPodaci1 {
  margin: 0px 15px 0px 0px;
}
.profilPodaci2 {
  margin: 0px auto 0px 0px;
}
.profilHeader {
  max-width: 750px;
  margin-right: auto;
  margin-left: auto;
  margin: 0;
  background-color: #e4857f;
}
.profilOpis {
  text-align: left;
  max-width: 750px;
  margin: 0px auto;
}
.profilOpis textarea {
  width: 100%;
  height: 100px;
}
.profilHeader .croppa {
  border-radius: 50rem;
}
.avatar {
  width: 100px;
  margin-right: auto;
  margin-left: auto;
}
.avatar .card {
  width: 100px;
  margin: 0;
  border-radius: 50rem;
}
.avatar .card img {
  border-radius: 50rem;
}
</style>