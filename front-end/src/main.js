import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'semantic-ui-css/semantic.css'


const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;

Vue.prototype.$googleApiKey = apiKey;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

