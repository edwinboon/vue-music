import { App, createApp } from 'vue'
import MyApp from './App.vue'
import router from './router'
import { store } from './store'
import { VeeValidatePlugin } from './plugins/validation'
import { auth } from './includes/firebase'
import './assets/tailwind.css'
import './assets/main.css'

let app: App

//check if user is logged in
auth.onAuthStateChanged(() => {
  if (!app) {
    // initialize instance
    app = createApp(MyApp)
  
    // register plugins
    app.use(store)
    app.use(router)
    app.use(VeeValidatePlugin)
  
    // mount app
    app.mount('#app') 
  }
})
