<template>
  <div class="card">
    <div class="card-body p-0">
      <img class="card-img-top" :src="store.profilePicture" />

      <p>{{ info.name }}</p>
      <img class="card-img-top" :src="info.option" />
      <div class="container">
        <p>{{ info.description }}</p>
        <p>{{ postedFromNow }}</p>

        <div class="komentari">
          <a
            v-for="c in comments"
            v-bind:key="c.posted_at"
            class="animate list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <small>{{ formatTime(c.posted_at) }} by {{ c.name }} </small>
            </div>
            <small>{{ c.comment }}</small>
          </a>
        </div>

        <div>
          <form @submit.prevent="postComment" class="form-inline mb-5">
            <div class="form-group">
              <input
                v-model="newComment"
                type="text"
                class="form-control"
                placeholder="Any comment?"
              />
            </div>
            <button type="submit" class="btn btn-primary ml-2">Post</button>
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
      comments: [],
      newComment: "",
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    postComment() {
      if (this.newComment) {
        db.collection("posts") // kolekcija roditelj
          .doc(this.info.id) // konkretni post
          .collection("comments") // podkolekcija
          .add({
            email: store.currentUser,
            userName: store.userDisplayName,
            comment: this.newComment,
            posted_at: Date.now(),
          })
          .then((result) => {
            console.log(result);
            this.newComment = "";
          })
          .catch((e) => {
            console.error(e);
          });

        this.comments.push({
          email: store.currentUser,
          name: store.userDisplayName,
          comment: this.newComment,
          posted_at: Date.now(),
        });
      }
    },
    formatTime(t) {
      return moment(t.posted_at).fromNow();
    },
    getComments() {
      console.log("firebase dohvat...");
      db.collection("posts")
        .doc(this.info.id)
        .collection("comments")
        .orderBy("posted_at")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            this.comments.push({
              posted_at: data.posted_at,
              comment: data.comment,
              name: data.userName,
              email: data.email,
            });
          });
        });
    },
  },
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
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

