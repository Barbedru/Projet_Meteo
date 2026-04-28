<template>
  <div>
    <h1>Météo - Liste des villes</h1>
    <City
        v-for="city in cities"
        :key="city.id"
        :name="city.name"
        :weather="city.weather"
        :temperature="city.temperature"
        :updatedAt="city.updatedAt"
    />
  </div>
</template>


<script>

import City from '../views/City.vue'

export default {
  components: {
    City
  },
  data() {
    return {
      cities: [
        {
          id: 1,
          name: 'Ville 1',
          weather: 'Ensoleillé',
          temperature: 22.0,
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Ville 2',
          weather: 'Peu nuageux',
          temperature: 19.5,
          updatedAt: new Date()
        }
      ]
    }
  }
}
</script>