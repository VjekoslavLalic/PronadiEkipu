<template>
    <div class="inbox-body">
    <ul>
        <li>
            <i class="fa fa-star"></i>
            <img src="@/assets/Marko.png" alt="">
            <h5>Marko Matičević</h5>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </li>
    </ul>
    </div>
</template>

<style lang="scss">

 .inbox-body li{
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

 .inbox-body ul{
     margin: auto;
     padding: 0 0 0 0;
 }

.inbox-body ul li .fa-star,
.inbox-body ul li img,
.inbox-body ul li h5,
.inbox-body ul li div{
    margin: 0 5px;
}
.inbox-body ul li .fa-star{
    color: #d5d5d5;
}

.inbox-body ul li h5{
    width: fit-content;
}

.inbox-body ul li img{
    width: 50px;
    height: 50px;
    border: 2px solid silver;
    border-radius: 20px;
}

.inbox-body ul li p{
    width: fit-content;
    
}
</style>