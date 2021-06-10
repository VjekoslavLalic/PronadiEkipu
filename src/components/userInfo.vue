<template>
  <div class="card">
    <p>Godine: {{ info.godine }}</p>
    <p>Spol: {{ info.spol }}</p>
    <p>Opis: {{ info.opis }}</p>
  </div>
</template>

<script>
import store from "@/store";
import { db, storage } from "@/firebase";
export default {
  props: ["info"],
  name: "userInfo",
  data() {
    return {
      store,
    };
  },
};
</script>