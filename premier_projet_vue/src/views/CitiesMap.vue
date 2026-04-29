<template>
  <!-- Div conteneur obligatoire avec une hauteur fixe, sinon la carte ne s'affiche pas -->
  <div style="height: 600px; width: 100%">

    <!-- S'affiche uniquement si loading est true -->
    <p v-if="loading">Requête en cours...</p>

    <!-- S'affiche uniquement si une erreur est survenue -->
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
      />

    </l-map>
  </div>
</template>

<script>
// On importe les 3 composants nécessaires depuis vue-leaflet
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
// On importe le CSS de Leaflet, pour afficher la carte
import 'leaflet/dist/leaflet.css'

export default {
  // On déclare les composants importés pour pouvoir les utiliser dans le template
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      zoom: 6,                        // niveau de zoom initial (1 = monde entier, 18 = rue)
      center: [46.603354, 1.888334],  // coordonnées GPS du centre de la France
      url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', // URL du fond de carte OpenStreetMap
      attribution: '© OpenStreetMap contributors', // crédit obligatoire OpenStreetMap
      cities: [],      // tableau vide au départ, sera rempli par l'API
      loading: false,  // false au départ, passera à true pendant la requête
      error: null      // null au départ, contiendra le message d'erreur si besoin
    }
  },

  created() {
    this.loading = true  // on active le message "Requête en cours..."

    // on appelle l'API OpenWeatherMap avec la clé stockée dans .env
    fetch(`https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)

        // on convertit la réponse HTTP en objet JavaScript
        .then(response => response.json())

        .then(data => {
          // data.list contient le tableau des villes retournées par l'API
          // on le transforme pour ne garder que les infos dont on a besoin
          this.cities = data.list.map(city => ({
            id: city.id,          // identifiant unique de la ville
            name: city.name,      // nom de la ville
            lat: city.coord.lat,  // latitude GPS (dans city.coord dans l'API)
            lon: city.coord.lon   // longitude GPS (dans city.coord dans l'API)
          }))
          this.loading = false  // on désactive le message "Requête en cours..."
        })

        // si la requête échoue, on stocke le message d'erreur
        .catch(err => {
          this.error = err.message  // affiche le message d'erreur dans le template
          this.loading = false      // on désactive le message "Requête en cours..."
        })
  }
}
</script>