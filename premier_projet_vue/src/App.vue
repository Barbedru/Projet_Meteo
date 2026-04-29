

<template>
  <main>
    <h1>Bienvenue sur l'application Météo</h1>
    <router-link to="/villes" >Voir la liste des villes</router-link>
    <br>
    <router-link to="/ville">Voir une ville </router-link>
    <br>
    <router-link to="/carte">Map </router-link>

  <router-view></router-view>
  </main>
</template>

<script>


export default {

  methods: {
  }
}
</script>

<style scoped></style>
