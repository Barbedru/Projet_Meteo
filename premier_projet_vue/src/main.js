import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CitiesList from './views/CitiesList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App },
        { path: '/cities', component: CitiesList }
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')