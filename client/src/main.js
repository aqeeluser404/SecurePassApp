import './assets/main.css'

import { createApp } from 'vue'
import store from './store'
import Nav from './components/Nav.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faArrowLeft)

const app = createApp(App)

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Nav', Nav);
app.mount('#app')
