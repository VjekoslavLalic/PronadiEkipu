<template>
  <div class="about">
    <div class="logoReg">
      <img alt="logo" src="../assets/logoPronadiEkipu.png" />
    </div>
    <h1>Registriraj se</h1>
    <div class="container">
      <div class="container">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form class="form-pozicija" method="POST" @submit.prevent="signup">
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName1">Ime i prezime</label>
              </div>
              <input
                type="text"
                v-model="Imeiprezime"
                class="form-control"
                id="userName"
                aria-describedby="ImeHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputNumber1">Broj</label>
              </div>
              <input
                type="number"
                v-model="Broj"
                class="form-control"
                id="number"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputEmail1">Email</label>
              </div>
              <input
                type="email"
                v-model="Email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputLozinka1">Lozinka</label>
              </div>
              <input
                type="password"
                v-model="Lozinka"
                class="form-control"
                id="lozinka"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputOpis1">Opis</label>
              </div>
              <textarea
                type="text"
                v-model="Opis"
                class="form-control"
                id="opis"
                aria-describedby="emailHelp"
                rows="5"
                cols="50"
                placeholder="Napišite nešto o sebi."
              ></textarea>
            </div>

            <button type="button" @click="signup()" class="button">
              Registriraj se
            </button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { firebase } from "@/firebase";
import router from "@/router";
import { db, storage } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      Imeiprezime: "",
      Broj: "",
      Email: "",
      Lozinka: "",
      Opis: "",
      myRoute
    };
  },
  methods: {
    signup() {
      let myRoute;
      const userName = this.Imeiprezime;
      const userEmail = this.Email;
      const userNumber = this.Broj;
      const userOpis = this.Opis;
      const userPassword = this.Lozinka;

      db.collection("userData")
        .add({
          Email: userEmail,
          userFullName: userName,
          Number: userNumber,
          userPassword: userPassword,
          userOpis: userOpis
        })
        .then(doc => {
          console.log("Spremljeno", doc);
        })
        .catch(e => {
          console.error(e);
        });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.Email, this.Lozinka)
        .then(result => {
          console.log("Uspješna prijava", result);

          this.$router.replace({ name: "Home" });
        })
        .then(user => {
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: this.Imeiprezime });
          //	this.verifyEmail();
        })
        .then(() => {
          this.Imeiprezime = "";
          this.Email = "";
          this.Lozinka = "";

          /*	firebase
						.auth()
						.signOut()
						.then(() => {
							alert("Potrebno je verificirati e-mail prije korištenja aplikacije pomoću poslanog linka.")
							this.$router.push({ name: "Login" });
						});*/
        });
      /*	.catch(function (error) {
					console.error("Došlo je do greške: ", error);
					if (error.message) {
						alert(error.message);
					}
				});
		},
		verifyEmail() {
			firebase
				.auth()
				.currentUser.sendEmailVerification()
				.then(function () {
					// Verification email sent.
					console.log("Verification email sent");
				})
				.catch(function (error) {
					// Error occurred. Inspect error.code.
					console.error("verifyError " + error);
				});
		},*/
    }
  }
};
</script>