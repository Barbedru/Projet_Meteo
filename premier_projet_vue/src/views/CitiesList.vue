<template>
  <div>
    <h1>Météo - Liste des villes</h1>
    <p v-if="loading">Requête en cours...</p>
    <p v-if="error" style="color: red">{{ error }}</p>
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
  data: function() {
    return {
      Cities: [],
      loading: false,
      error: null,

    }
  },

  created() {            //le hook qui se déclenche quand le composant est créé
    this.loading = true  //loading passe à true au début et revient à false une fois la requête terminée
    fetch(`https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          this.cities = data.list.map(city => ({   // transforme les données de l'API au format attendu par le composant City
            id: city.id,
            name: city.name,
            weather: city.weather[0].description,
            temperature: city.main.temp,
            updatedAt: new Date(city.dt * 1000)          //convertit le timestamp Unix en millisecondes
          }))
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.loading = false
        })
  }

}
</script>