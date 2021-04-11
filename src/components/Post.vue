<template>
  <div class="card">
    <div class="card-body p-0">
      <p>{{ info.name }}</p>
      <img class="card-img-top" :src="info.option" />
      <div class="container">
        <p>{{ info.description }}</p>
        <p>{{ postedFromNow }}</p>
        <div>
          <div>Prikaz poruke:</div>
          <form
            action="#"
            class="form-wrap"
            method="POST"
            @submit.prevent="newComment"
          >
            <label>Komentiraj: </label>
            <input
              v-model="newPostComment"
              type="text"
              id="fname"
              name="fname"
            /><br /><br />

            <div class="form-submit">
              <button type="submit" value="Objavi" id="objavi">Objavi</button>
              <!--<input type="submit" value="Objavi" id="objavi" />-->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { firebase } from "@/firebase.js";
import store from "@/store";
import router from "@/router";
import { db, storage } from "@/firebase";

export default {
  props: ["info"],
  name: "Post",
  data() {
    return {
      store,
      newPostComment: ""
    };
  },
  methods: {
    newComment() {
      const comment = this.newPostComment;

      db.collection("posts")
        .add({
          //userName: userDisplayName,
          comment: comment
        })
        .then(doc => {
          console.log("Spremljen komentar", doc);
          this.newPostComment = "";
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    }
  }
};
</script>

<style>
.card {
  /* Add shadows to create the "card" effect */
  transition: 0.3s;
  max-width: 750px;
  left: 0;
  right: 0;
  margin: 0px auto 50px auto;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgb(255, 255, 255);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>

