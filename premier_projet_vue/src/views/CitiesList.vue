<template>
  <div v-for="zone in zones" :key="zone.label">
    <h2>{{ zone.label }}</h2>
    <div class="cards-grid">
      <City
          v-for="city in zone.cities"
          :key="city.id"
          :name="city.name"
          :weather="city.weather"
          :temperature="city.temperature"
          :updatedAt="city.updatedAt"
          :icon="city.icon"
      />
    </div>
  </div>
</template>


<script>

import City from '../views/City.vue'

export default {
  components: {
    City
  },

  data: function() {
    return {
      zones: [
        { label: 'Zone Nord 1', cities: [] },
        { label: 'Zone Nord 2', cities: [] },
        { label: 'Bretagne Ouest', cities: [] },
        { label: 'Bretagne Est', cities: [] },
        { label: 'Isère', cities: [] },
      ],
      loading: false,
      error: null,

    }
  },

  created() {
    this.loading = true  // on active le message "Requête en cours..."

    // on appelle l'API OpenWeatherMap avec la clé stockée dans .env
    const url1 = `https://api.openweathermap.org/data/2.5/find?lat=50.289086&lon=3.615037&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
    const url2 = `https://api.openweathermap.org/data/2.5/find?lat=50.357113&lon=3.518332&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
    const url3 = `https://api.openweathermap.org/data/2.5/find?lat=48.186198&lon=-3.812634&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
    const url4 = `https://api.openweathermap.org/data/2.5/find?lat=48.410006&lon=-1.752499&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`
    const url5 = `https://api.openweathermap.org/data/2.5/find?lat=45.070814&lon=5.550499&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`

    Promise.all([fetch(url1), fetch(url2), fetch(url3), fetch(url4), fetch(url5)])
        .then(([res1, res2, res3, res4, res5]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()]))
        .then(([data1, data2, data3, data4, data5]) => {
          const mapCity = city => ({
            id: city.id,
            name: city.name,
            weather: city.weather[0].description,
            temperature: city.main.temp,
            updatedAt: new Date(city.dt * 1000),
            icon: city.weather[0].icon,
            lat: city.coord.lat,
            lon: city.coord.lon
          })

          const results = [data1, data2, data3, data4, data5]
          results.forEach((data, i) => {
            this.zones[i].cities = data.list.map(mapCity)
          })
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.loading = false    // on désactive le message "Requête en cours..."
        })
  }

}
</script>

<style scoped>
h2 {
  border-left: 4px solid #3b82f6;
  padding-left: 0.5rem;
  margin: 1.5rem 0 0.75rem;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>