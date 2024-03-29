import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XUi from './packages'

createApp(App)
  .use(store)
  .use(router)
  .use(XUi)
  .mount('#app')
