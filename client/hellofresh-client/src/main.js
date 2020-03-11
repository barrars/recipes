import Vue from 'vue'
import App from './App.vue'
// import hello from "./components/HelloWorld.vue";
// import search from './components/searchbar.vue'
// import { library,  } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faUserSecret)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.config.productionTip = false

// import "bootstrap/dist/css/bootstrap.min.css"
// import 'bulma'
import './assets/my.sass'
new Vue({
  render: h => h(App),
}).$mount('#app')

