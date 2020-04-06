import i18n from './assets/locales'
import Vue from 'vue'
import PageEditor from './rxpage/PageEditor.vue'
import axios from 'axios'

window.$axios = axios

new Vue({
  el: '#rxpage',
  i18n,
  render: h => h(PageEditor)
})
