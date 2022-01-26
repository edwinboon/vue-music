import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './assets/tailwind.css'
import './assets/main.css'

// initialize instance
const app = createApp(App)

// register plugins
app.use(store)
app.use(router)

// mount app
app.mount('#app')
