import './assets/main.css'

import { createApp } from 'vue'
import store from './store'
import Nav from './components/Nav.vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(store)


app.component('Nav', Nav);
app.mount('#app')
