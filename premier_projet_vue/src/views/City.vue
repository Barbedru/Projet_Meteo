<template>
  <div>
    <h1>{{ name }}</h1>
    <p>Météo : {{ weather }}</p>
    <p>Température : {{ temperature }} °C</p>
    <p>Mise à jour : {{ formatDate(updatedAt) }}</p>
  </div>
</template>

<script>
import { format } from 'timeago.js';

export default {
  props: ['name', 'weather', 'temperature', 'updateAt'],
  methods: {
    formatDate(date) {
      return format(date, 'fr')
    }
  }
}
</script>