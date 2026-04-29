import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../views/City.vue'
import CitiesMap from "@/views/CitiesMap.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/villes', component: CitiesList },
        { path: '/ville', component: City },
        { path: '/carte', component: CitiesMap }
    ]
})

export default router