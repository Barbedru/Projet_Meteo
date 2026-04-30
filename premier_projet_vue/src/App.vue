

<template>
  <main>
    <div class="banniere">
      <img src="https://static.vecteezy.com/ti/photos-gratuite/p2/5411405-meteo-previsions-icone-sur-smartphone-banniere-arriere-plan-rendu-3d-illustration-gratuit-photo.jpg" alt="bannière météo" />
    </div>

    <h1>Bienvenue sur l'application Météo</h1>

    <button><router-link to="/App" >Accueil</router-link></button>
    <br>
    <button><router-link to="/villes" >Voir la liste des villes</router-link></button>
    <br>
    <button><router-link to="/carte">Map </router-link></button>

  <router-view></router-view>
  </main>
</template>

<script>


export default {

}



</script>

<style scoped>

a {
  text-decoration: none;  /* enlève le soulignement */
  color: inherit;         /* enlève la couleur bleue du lien */
}

main {
  max-width: 1000px;
  border-radius : 10px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  background-color:#87CEEB;
}

.banniere img {
  width: 100%;
  height: 200px;
  object-fit: cover;  /* recadre l'image sans la déformer */
  border-radius: 10px;
  margin-bottom: 1rem;
}

</style>
