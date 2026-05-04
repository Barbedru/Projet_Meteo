<template>
  <div class="card">
    <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" :alt="weather" />
    <h3>{{ name }}</h3>
    <p class="temp">{{ temperature.toFixed(1) }}°C</p>
    <p class="weather">{{ weather }}</p>
    <p class="updated">{{ formatDate(updatedAt) }}</p>
  </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
  props: ['name', 'weather', 'temperature', 'updatedAt', 'icon'],
  methods: {
    formatDate(date) {
      return format(date, 'fr')
    }
  }
}
</script>

<style scoped>
.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  width: 140px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.card img {
  width: 50px;
}

.card h3 {
  font-size: 0.9rem;
  margin: 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .temp {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1d4ed8;
  margin: 0.25rem 0;
}

.card .weather {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: capitalize;
}

.card .updated {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 0.4rem;
}
</style>