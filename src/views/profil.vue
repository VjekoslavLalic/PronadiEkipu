<template>
  <div class="container my-4">
    <!--Grid column-->
    <div class="profilHeader">
      <form class="md-form">
        <div class="profilSlika">
          <img
            src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
            class="rounded-circle z-depth-1-half avatar-pic"
            alt="example placeholder avatar"
          />
          <!-- mb-4 -->
        </div>

        <div class="btn btn-mdb-color btn-rounded mb-4">
          <input type="file" />
          <!-- btn btn-mdb-color btn-rounded float-left -->
        </div>
        <!-- md-form -->
      </form>
      <!-- col-md-6 mb-4 -->
    </div>
    <div class="profilForma">
      <div class="profilPodaci">
        <div class="profilPodaci1">
          <p>Ime i prezime:</p>
          <p>E-mail:</p>
          <p>Number:</p>
          <p>Age:</p>
          <!-- / profilPodaci1 -->
        </div>
        <div class="profilPodaci2">
  
          <p contenteditable="true" >{{ store.userDisplayName }}</p>  
          <p contenteditable="true">{{ store.userEmail }}</p>
          <p contenteditable="true">0919805009</p>
          <p contenteditable="true">21</p>
          <!-- / profilPodaci2 -->
        </div>
        <!-- / profilPodaci -->
      </div>
      <div class="messengerLogo"><img src="@/assets/messenger.png" /></div>
      <!-- / profilForma -->
    </div>
    <div class="profilOpis">
      <p>Opis:</p>
      <textarea
        contenteditable="true"
        placeholder="Napišite nešto o sebi."
        rows="5"
        cols="50"
      ></textarea>
    </div>
    <!-- / container my-4 -->
  </div>
</template>


<script>
import store from "@/store";
import { firebase } from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged(user => {
 // const currentRoute = router.currentRoute;
  if (user) {
    // User is signed in.
    store.currentUser = user.email;
    console.log("emailVerified:" + user.emailVerified);

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

  if(user.email){
    store.userEmail = user.email;
  }
});




export default {
  name: "profil",
  data(){
    return{
      store,
    };
  },
 
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
  margin: 0px auto 0px 30px;
}

.messengerLogo {
  text-align: center;
  margin: 0px auto 0px 50px;
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
</style>