<template>
  <div class="toolbar">
    <div class="left">
      <div class="button theme"
        @click="themesClick"
      > 
        <i class="fas fa-layer-group"></i> 
        {{$t('toolbar.new')}}
      </div>
      <!--div class="button new"> 
        <i class="fas fa-file-code"></i> 
        {{$t('toolbar.new')}}
      </div-->
      <div class="button open"
        @click="showOpenDialog"
      > 
        <i class="fas fa-folder-open"></i> 
        {{$t('toolbar.open')}}
      </div>
      <div class="button save"> 
        <i class="fas fa-save"></i> 
        {{$t('toolbar.save')}}
      </div>
    </div>
    <div class="center"><span class="logo">RXStudio</span></div>
    <div class="right">
      <div class="button download"
        @click="onDownLoad"
      > 
        <i class="fas fa-download"></i> 
        {{$t('toolbar.download')}}
      </div>
      <div class="button about"
        @click = "aboutDialog = true"
      > 
        <i class="fas fa-question-circle"></i> 
        {{$t('toolbar.about')}}
      </div>
      <a class="button github-link" target="_blank" href="https://github.com/vularsoft/rxeditor"><i class="fab fa-github"></i> Github</a>
    </div>

    <ThemeSelectDialog 
      v-model="themeDialog"
      @changeTheme = "changeTheme"
    >
    </ThemeSelectDialog>
    <OpenDialog 
      v-model="openDialog"
      @selectProject = "openProject"
    >
    </OpenDialog>
    <AboutDialog v-model="aboutDialog">
    </AboutDialog>
    
  </div>
</template>

<script>
import ThemeSelectDialog from './themes/ThemeSelectDialog.vue'
import OpenDialog from './OpenDialog.vue'
import AboutDialog from './AboutDialog.vue'
export default {
  name: 'Toolbar',
  components:{
    ThemeSelectDialog,
    OpenDialog,
    AboutDialog,
  },
  data () {
    return {
      themeDialog:false,
      openDialog:false,
      aboutDialog:false,
    }
  },
  methods:{
    themesClick(){
      this.themeDialog = true
    },

    showOpenDialog(){
      this.openDialog = true
    },

    changeTheme(theme){
      this.$emit('changeTheme', theme)
    },
    openProject(project){
      this.$emit('openProject', project)
    },

    onDownLoad(){
      this.$emit('download')
    }
  }
}
</script>

<style>
</style>