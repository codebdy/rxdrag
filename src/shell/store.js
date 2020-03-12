import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default 
new Vuex.Store({
  state:{
    activedFile:null,
    theme:null,
  },

 
  mutations:{
    activeFile(state, file){
      state.activedFile = file
    },

    themeChange(state, theme){
      state.theme = theme
    },
  },
 
  actions: {
  },
})
