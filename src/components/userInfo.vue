<template>
  <div class="card">
    <p>Godine: {{info.userAge}}</p>
   
    <p>Spol: {{info.userSex}}</p>
    <p>Opis: {{info.userOpis}}</p>
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
      store
    };
  }
};
</script>