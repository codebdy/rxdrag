import Vue from 'vue'
import Shell from './shell/Shell.vue'
import '../style/shell.css'
import i18n from './assets/locales'
import axios from 'axios'

window.$axios = axios
window.$bus= new Vue();

new Vue({
  el: '#rxeditor',
  i18n,
  render: h => h(Shell)
})
