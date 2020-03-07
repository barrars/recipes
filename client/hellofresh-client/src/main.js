import Vue from 'vue'
import App from './App.vue'
// import hello from "./components/HelloWorld.vue";
// import search from './components/searchbar.vue'


Vue.config.productionTip = false

// import "bootstrap/dist/css/bootstrap.min.css"
// import 'bulma'
import './assets/my.sass'
new Vue({
  render: h => h(App),
}).$mount('#app')

