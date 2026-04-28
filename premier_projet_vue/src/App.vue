<script setup></script>

<template>
  <main>
    <h1>Bienvenue sur l'application Météo</h1>
    <router-link to="/villes" >Voir la liste des villes</router-link>

    <router-link to="/ville">Voir une ville </router-link>
  <router-view></router-view>
  </main>
</template>

<script>


export default {
  components: {

  },
  methods: {
    onListClick() {
      alert('Vous avez cliqué sur la liste des villes !')
    }
  }
}
</script>

<style scoped></style>
