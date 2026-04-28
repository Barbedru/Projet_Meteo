<template>
  <div>
    <h1>{{ name }}</h1>
    <p>Météo : {{ weather }}</p>
    <p>Température : {{ temperature }} °C</p>
    <p>Mise à jour : {{ updatedAt.toLocaleDateString() }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Villard-de-Lans',
      weather: 'nuageux',
      temperature: 16,
      updatedAt: new Date()
    }
  }
}
</script>