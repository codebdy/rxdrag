import i18n from './assets/locales'
import Vue from 'vue'
import Shell from './shell/Shell.vue'
import '../style/shell.css'
import axios from 'axios'
//import Vuex from 'vuex'
import store from './shell/store';    

window.$axios = axios
window.$rxbus= new Vue();

//Vue.use(Vuex)

new Vue({
  el: '#rxeditor',
  i18n,
  store,
  render: h => h(Shell)
})
