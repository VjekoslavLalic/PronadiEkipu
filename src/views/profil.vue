<template>
  <div class="profil">
    <header>
      <div class="profilna"><img src="@/assets/profilna.png" /></div>
      <div class="imeLokacija">
        <p>Vjekoslav Lalić</p>
        <p>Hrvatska, Pula</p>
      </div>
      <div>rating</div>
    </header>
    <main>
      <div class="podaciLogo">
        <div class="podaci">
          <!-- obavezno prepraviti nesmije biti paragraf -->
          <p>Gender: Male</p>
          <p>E-mail: lalicvjeko34@gmail.com</p>
          <p>Number: 0919805009</p>
          <p>Age: 21</p>
          <img src="@/assets/messenger.png" />
        </div>
        <div class="messengerLogo"></div>
      </div>
      <div class="opis"></div>
    </main>
  </div>
</template>


<script>
export default {
  name: "profil",
  data() {
    return {};
  },
};
</script>