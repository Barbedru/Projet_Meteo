<template>
  <div>
    <h1>{{ name }}</h1>
    <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" :alt="weather" />
    <p>Météo : {{ weather }}</p>
    <p>Température : {{ temperature }} °C</p>
    <p>Mise à jour : {{ formatDate(updatedAt) }}</p>
  </div>
</template>

<script>
import { format } from 'timeago.js';


export default {
  props: ['name', 'weather', 'temperature', 'updatedAt', 'icon', 'lat', 'lon'],
  methods: {
    formatDate(date) {
      return format(date, 'fr')
    }
  }
}
</script>