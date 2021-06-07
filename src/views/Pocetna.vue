<template>
<body>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <div id="start">
    <div class="container">
      <div class="row row-cols-2 g-2">
        <div class="col">
          <div class="p-3 border bg-light1">Mi spajamo ljude.</div>
        </div>

        <div class="w-100"></div>

        <div class="col">
          <div class="p-3 border bg-light1">Vi stvarate prijateljstva.</div>
        </div>

        <div class="w-100"></div>

        <div class="col">
          <a href="/Login"><div class="p-3 border bg-light2">Započnimo</div></a>
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<style >
#start {
  position: fixed;
  top: 25%;
  left: 35%;
}

.p-3.border.bg-light1{
  background-color:pink;
  font-size: x-large;
  border-radius: 30px;
  text-align: center;
  
}

.p-3.border.bg-light2{
background-color: powderblue;
font-size: x-large;
border-radius: 30px;
text-align: center;
}

.fa-events-icons-ready{
 background-image:url(https://michiganross.umich.edu/sites/default/files/images/articles/remote-connections.jpg);
 height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.col{
  margin:30px;
  padding:5px;
  
}

a:visited {
 color: black;
 
}

@media screen and (max-width: 600px) {
  .p-3.border.bg-light1 {
     margin-left: -100px;
     text-align: center;
     font-size: x-large;
  }
  .p-3.border.bg-light2 {
     margin-left: -100px;
     text-align: center;
  }
  .fa-events-icons-ready{
 background-image:url(https://michiganross.umich.edu/sites/default/files/images/articles/remote-connections.jpg);
 height: 50%;
  background-position: center;
  background-size: cover;
  background-repeat:repeat;
}
  }



</style>