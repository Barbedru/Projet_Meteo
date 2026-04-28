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
  props: ['name', 'weather', 'temperature', 'updateAt']
}
</script>