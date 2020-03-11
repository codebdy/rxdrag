import Vue from 'vue'
import Shell from './Shell.vue'
import '../style/style.css'
import i18n from './assets/locales'

new Vue({
  el: '#rxeditor',
  i18n,
  render: h => h(Shell)
})
