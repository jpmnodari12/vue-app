import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import FirebaseVue from './firebase'
import Vuetify from 'vuetify';

Vue.use(FirebaseVue)

Vue.use(Vuetify, { 
   theme: {
     primary: '#0B090A'
  // secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107',
   } 
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
