import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../views/City.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/villes', component: CitiesList },
        {path: 'ville', component: City }
    ]
})

export default router