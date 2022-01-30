import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { VeeValidatePlugin } from './plugins/validation'
import './includes/firebase'
import './assets/tailwind.css'
import './assets/main.css'

// initialize instance
const app = createApp(App)

// register plugins
app.use(store)
app.use(router)
app.use(VeeValidatePlugin)

// mount app
app.mount('#app')
