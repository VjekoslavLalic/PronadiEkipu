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
          <form class="form-pozicija">
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName1">Ime i prezime</label>
              </div>
              <input
                type="text"
                v-model="Imeiprezime"
                class="form-control"
                id="exampleInputIme1"
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
                id="exampleInputNumber1"
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
                id="exampleInputEmail1"
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
                id="exampleInputPassword1"
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
                id="exampleInputOpis1"
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
import { firebase } from "@/firebase.js";


export default {
  name: "Signup",
  data() {
    return {
      Imeiprezime: "",
      Broj: "",
      Email: "",
      Lozinka: "",
      Opis: "",
    };
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.Email, this.Lozinka)
        .then((result) => {
          console.log("Uspješna prijava", result);
          this.$router.replace({ name: "Home" }); 
        })
       .then((user) => {
					firebase
						.auth()
            .currentUser.updateProfile({ displayName: this.Imeiprezime})
            
            
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
				})
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
  },
};
</script>