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
                <label for="exampleInputName1">Ime</label>
              </div>
              <input
                type="text"
                v-model="Ime"
                class="form-control"
                id="exampleInputIme1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputPrezime1">Prezime</label>
              </div>
              <input
                type="text"
                v-model="Prezime"
                class="form-control"
                id="exampleInputPrezime1"
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
              ></textarea>
            </div>

            <button type="button" @click="signup" class="button">
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
      Ime: "",
      Prezime: "",
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
          console.log("Uspješna registracija", result);
          this.$router.replace({ name: "Home2" });
        })
        .catch(function (error) {
          console.error("Doslo je do greske", error);
        });
      console.log("nastavak");
    },
  },
};
</script>