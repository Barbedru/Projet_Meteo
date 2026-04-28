<script setup></script>

<template>
  <main>
    <h1>Bienvenue sur l'application Météo</h1>
    <a href="#" @click.prevent="onListClick">Voir la liste des villes</a>
    <CitiesList/>
  </main>
</template>

<script>
import CitiesList from './views/CitiesList.vue'

export default {
  components: {
    CitiesList
  },
  methods: {
    onListClick() {
      alert('Vous avez cliqué sur la liste des villes !')
    }
  }
}
</script>

<style scoped></style>
