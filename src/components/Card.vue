<template>
  <div class="card">
    <div class="card-body p-0">
      <a :href="info.page"> <img class="card-img-top" :src="info.img" /> </a>
      <div class="container">
        <h4>
          <b>{{ info.description }}</b>
          <br />
          <a
            @submit.prevent="myRoute"
            class="btn btnDruzenje"
            role="button"
            href="PostForm"
          >
            Ponudi druženje
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import router from "@/router";
export default {
  props: ["info"],
  name: "Card",
  methods: {
    myRoute() {
      consol.log(this.$router);
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

.btnDruzenje {
  border-color: #e4857f;
  color: #e4857f;
  border-radius: 10px;
}
.btnDruzenje:focus {
  background-color: #e4857f;
}
</style>

