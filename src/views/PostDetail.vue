<template>
  <div v-if="card">
    <InstagramCard :info="card" :showcomments="true" />
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import store from "@/store.js";

export default {
  name: "post-detail",
  props: ["id"],
  data() {
    return {
      card: null,
    };
  },
  components: {
    Post,
  },
  mounted() {
    console.log(this.id);
    db.collection("posts")
      .doc(this.id)
      .get()
      .then((doc) => {
        this.card = doc.data();
        this.card.id = doc.id;
      });
  },
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
}
</style>