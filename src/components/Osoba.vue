<template>
    <div class="osoba">
    <ul>
        <li>
            <i class="fa fa-star"></i>
            <img :src=" profile.image " alt=""/>
            <h5>{{ profile.name }}</h5>
            <p>{{ profile.description }}</p>
        </li>
    </ul>
    </div>
</template>

<style>

 .osoba li{
     display: flex;
     align-items: center;
     justify-content: space-around;
     width: 98%;
     margin: 20px auto;
     height: 50px;
     background: #fefefe;
     color: #202020;
     overflow-y: hidden;
}

 .osoba ul{
     margin: auto;
     padding: 0 0 0 0;
 }

.osoba ul li .fa-star,
.osoba ul li img,
.osoba ul li h5,
.osoba ul li div{
    margin: 0 5px;
}
.osoba ul li .fa-star{
    color: #d5d5d5;
}

.osoba ul li h5{
    width: fit-content;
}

.osoba ul li img{
    width: 50px;
    height: 50px;
    border: 2px solid silver;
    border-radius: 20px;
}

.osoba ul li p{
    width: fit-content;
    
}
</style>


<script>
export default {
  props: ["profile"],
  name: "Osoba",
};
</script>