<template>
  <!-- Div conteneur avec une hauteur fixe, sinon la carte ne s'affiche pas -->
  <div style="height: 600px; width: 100%">

    <p v-if="loading">Requête en cours...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- Composant carte, zoom définit le niveau de zoom, center définit le centre de la carte -->
    <l-map :zoom="zoom" :center="center">

      <!-- Fond de carte : url = source des tuiles, attribution = crédit affiché en bas de carte -->
      <l-tile-layer :url="url" :attribution="attribution" />

      <!-- On boucle sur chaque ville pour créer un marqueur -->
      <!-- :key="city.id" aide Vue à identifier chaque marqueur de façon unique -->
      <!-- :lat-lng attend un tableau [latitude, longitude] pour positionner le marqueur -->
      <l-marker
          v-for="city in cities"
          :key="city.id"
          :lat-lng="[city.lat, city.lon]"
      >

        <l-icon
            :icon-url="`https://openweathermap.org/img/wn/${city.icon}@2x.png`"
            :icon-size="[50, 50]"
        />
      </l-marker>

    </l-map>
  </div>
</template>

<script>
// On importe les 4 composants nécessaires depuis vue-leaflet
import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet'
// On importe le CSS de Leaflet, pour afficher la carte
import 'leaflet/dist/leaflet.css'

export default {
  // On déclare les composants importés pour pouvoir les utiliser dans le template
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      zoom: 6,                        // niveau de zoom initial (1 = monde entier, 18 = rue)
      center: [46.603354, 1.888334],  // coordonnées GPS du centre de la France
      url: 'https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', // URL du fond de carte OpenStreetMap
      attribution: '© OpenStreetMap contributors', // crédit obligatoire OpenStreetMap
      cities: [],      // tableau vide au départ, sera rempli par l'API
      loading: false,  // false au départ, passera à true pendant la requête
      error: null      // null au départ, contiendra le message d'erreur si besoin
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

          this.cities = [
            ...data1.list.map(mapCity),
            ...data2.list.map(mapCity),
            ...data3.list.map(mapCity),
            ...data4.list.map(mapCity),
            ...data5.list.map(mapCity),
          ]
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.loading = false    // on désactive le message "Requête en cours..."
        })
  }
}
</script>