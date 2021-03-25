<template>
  <div class="container my-4">
    <!--Grid column-->
    <div class="profilHeader">
      <form class="md-form" method="POST">
        <div class="profilSlika">
          <croppa
            :width="100"
            :height="100"
            placeholder="Učitaj sliku"
            v-model="imageReference"
          ></croppa>
          <div class="form-submit">
            <button type="submit" value="Objavi" id="objavi">Objavi</button>
            <!--<input type="submit" value="Objavi" id="objavi" />-->
          </div>
          <!-- mb-4 -->
          <p contenteditable="true">
            {{ store.userDisplayName }}
          </p>
        </div>
        <!-- md-form -->
      </form>
      <!-- col-md-6 mb-4 -->
    </div>
    <div class="profilForma">
      <div class="profilPodaci">
        <div class="profilPodaci1">
          <p>Email:</p>
          <p>Broj:</p>
          <p>Age:</p>
          <!-- / profilPodaci1 -->
        </div>
        <div class="profilPodaci2">
          <p contenteditable="true">{{ store.userEmail }}</p>
          <p contenteditable="true">broj moba</p>
          <p contenteditable="true">21</p>
          <!-- / profilPodaci2 -->
        </div>
        <!-- / profilPodaci -->
      </div>
      <div class="messengerLogo"><img src="@/assets/messenger.png" /></div>
      <!-- / profilForma -->
    </div>
    <form method="POST" @submit.prevent="postNewOpis">
      <div class="profilOpis">
        <p>Opis:</p>
        <textarea
          contenteditable="true"
          placeholder="Napišite nešto o sebi."
          rows="5"
          cols="50"
          v-model="newUserOpis"
        >
        </textarea>
      </div>
      <div class="form-submit">
        <button type="submit" value="Dodaj" id="dodaj">Dodaj</button>
      </div>
    </form>
    <!-- / container my-4 -->
  </div>
</template>


<script>
import store from "@/store";
import { firebase } from "@/firebase";
import router from "@/router";
import { db, storage } from "@/firebase";

firebase.auth().onAuthStateChanged(user => {
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
      imageReference: null,
      newUserOpis: ""
    };
  },
  mounted() {
    console.log("MOUNTED");
  },
  methods: {
    postNewOpis() {
      const userOpis = this.newUserOpis;
      db.collection("userData")
        .add({
          email: store.currentUser,
          opis: userOpis
        })
        .then(doc => {
          console.log("Spremljeno", doc);
          this.newUserOpis = "";
        })
        .catch(e => {
          console.error(e);
        });
    },
    postNewImage() {
      this.imageReference.generateBlob(blobData => {
        console.log(blobData);

        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";
        console.log(imageName);

        storage
          .ref(imageName)
          .put(blobData)
          .then(result => {
            // uspjesna linija
            console.log(result);
          })
          .catch(e => {
            console.error(e);
          });
      });
    }
  }
};
</script>

<style>
.kv-avatar .krajee-default.file-preview-frame,
.kv-avatar .krajee-default.file-preview-frame:hover {
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
  text-align: center;
}
.kv-avatar {
  display: inline-block;
}
.kv-avatar .file-input {
  display: table-cell;
  width: 213px;
}
.kv-reqd {
  color: red;
  font-family: monospace;
  font-weight: normal;
}
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

.messengerLogo {
  text-align: center;
  margin: 0px auto 0px 0px;
  margin-top: 25px;
}
.messengerLogo img {
  width: 100px;
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
.profilSlika img {
  margin: 0px auto;
}
.profilSlika {
  margin: 0;
  background-color: #e4857f;
}
</style>