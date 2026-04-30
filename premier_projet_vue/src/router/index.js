import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import CitiesMap from "@/views/CitiesMap.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/villes', component: CitiesList },
        { path: '/carte', component: CitiesMap }
    ]
})

export default router