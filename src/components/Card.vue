<template>
<div class="card">
  <div class="card-body p-0">
  <img class="card-img-top" :src="info.img" >
  <div class="container">
    <h4><b>{{info.description}}</b></h4>
  </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['info'],
  name: 'Card',
};
</script>

<style>



.card {
  /* Add shadows to create the "card" effect */
  transition: 0.3s;
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

