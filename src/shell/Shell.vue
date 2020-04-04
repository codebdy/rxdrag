<template>
  <div class="vular-studio">
    <div v-if="$store.state.isLoading" class="loading-box">
      <img src="images/loading.gif"/>
    </div>
    <toolbar
      @changeTheme = "changeTheme"
      @openProject = "openProject"
    ></toolbar>
    <div class="workspace">
      <LeftArea>
        <template #top>
          <WidgetTabs>
            <tab :name="$t('widgets.options')"
                 :icon="'fas fa-paint-brush'" 
                 :selected="true">
                <OptionBox v-model="options" :breakPoint = "breakPoint"></OptionBox>
            </tab>
            <tab :name="$t('widgets.style')"
                 :icon="'fab fa-css3'">
              <StyleBox v-model="node"></StyleBox>
            </tab>
            <tab :name="$t('widgets.code')"
                 :icon="'fas fa-code'">
              <CodeBox v-model="htmlCode"></CodeBox>
            </tab>
            <!--tab :name="$t('widgets.anmation')"
                 :icon="'fab fa-windows'">
              <h1>动画，暂不实现</h1>
            </tab-->
          </WidgetTabs>
        </template>
        <template #bottom>
          <WidgetTabs>
            <tab :name="$t('widgets.overview')"
                 :icon="'fas fa-th-list'" 
                 :selected="true">
              <OptionOverviewBox v-model="node"></OptionOverviewBox>
            </tab>
          </WidgetTabs>
        </template>
      </LeftArea>
      <CenterArea>
        <PagesArea>
        </PagesArea>
      </CenterArea>
      <RightArea>
        <template #top>
          <WidgetTabs>
            <tab 
              :name="$t('widgets.studio')"
              :icon="'fas fa-puzzle-piece'" 
              :selected="true"
            >
            <Toolbox :groups="toolbox"></Toolbox>
            </tab>
            <tab :name="$t('widgets.files')"
                 :icon="'fas fa-copy'">
              <FileBox v-model="files" 
               @nodeSelected="fileSelect"
              >
               </FileBox>
            </tab>
          </WidgetTabs>
        </template>
        <template #bottom>
          <WidgetTabs>
            <tab 
              :name="$t('widgets.treeview')"
              :icon="'fas fa-project-diagram'" 
              :selected="true">
              <TreeBox v-model="nodes"
                @nodeSelected = "nodeSelected"
              >
              </TreeBox>
            </tab>
          </WidgetTabs>
        </template>
      </RightArea>
    </div>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import LeftArea from './components/LeftArea.vue'
import CenterArea from './components/CenterArea.vue'
import RightArea from './components/RightArea.vue'
import WidgetTabs from './components/tabs/WidgetTabs.vue'
import Tab from './components/tabs/Tab.vue'
import Toolbox from './components/Toolbox/Toolbox.vue'
import PagesArea from './components/page/PagesArea.vue'
import FileBox from './components/filetree/FileBox.vue'
import TreeBox from './components/treebox/TreeBox.vue'

import RxInputRow from './components/inputs/RxInputRow.vue'
import OptionBox from './components/options/OptionBox.vue'
import OptionOverviewBox from './components/options/OptionOverviewBox.vue'
import CodeBox from './components/options/CodeBox.vue'
import StyleBox from './components/options/StyleBox.vue'


//import files from '../mock/files.js'
import nodesData from '../mock/nodes.js'
//import options from '../mock/options.js'
//import toolbox from '../mock/toolbox.js'

import {OptionsFactory} from './schemas/OptionsFactory'
import {HtmlBeautify} from "./basic/HtmlBeautify"

//var JSZip = require("jszip")
//var FileSaver = require('file-saver');
//var zip = new JSZip()

var optionsFactory = new OptionsFactory

export default {
  name: 'rxeditor',
  components:{
    Toolbar,
    LeftArea,
    CenterArea,
    RightArea,
    WidgetTabs,
    Tab,
    PagesArea,
    Toolbox,
    FileBox,
    TreeBox,
    RxInputRow,
    OptionBox,
    OptionOverviewBox,
    CodeBox,
    StyleBox,
  },
  data () {
    return {
      breakPoint:'md',
      baseToolbox:[],
      files:[],
      nodes:[],
      options:[],
      //optionOverview : {},
      htmlCode:'',
      //styles:{},
      node:null,
    }
  },
  computed:{
    toolbox(){
      let themeToolbox = this.$store.state.theme ? this.$store.state.theme.toolboxItems : null
      if(themeToolbox){
        let themeToolboxGroup = {
          title : this.$t('toolbox.theme'),
          items : themeToolbox
        }
        let toolbox = [themeToolboxGroup]
        toolbox.push.apply(toolbox, this.baseToolbox)
        return toolbox
      }
      else{
        return this.baseToolbox
      }
    }
  },
  watch:{
    '$store.state.theme': function (theme) {
      this.showFiles(theme)
      //你需要执行的代码
      $bus.$emit('themeChanged', theme)
    }
  },

  methods:{
    nodeSelected(node){
      $bus.$emit('nodeSelected', node)
    },

    fileSelect(file){
      $bus.$emit('fileSelected', file)
    },
    changeTheme(theme){
      if(!theme.theme){
        return
      }
      $axios.get(theme.theme)
      .then((res)=>{
        this.$store.commit('themeChange', res.data)
      })
    },

    openProject(porject){
      this.showFiles(porject)
    },

    showFiles(proOrTheme){
      this.files = proOrTheme
      this.loadCssAndJs(proOrTheme)
    },

    onShowNodeTree(nodes){
      this.nodes = nodes
    },

    onEditNode(node, pageId){
      this.node = node
      this.pageId = pageId
      this.options = node ? optionsFactory.resolveOptions(node, this.breakPoint) : []
      let beautify = new HtmlBeautify(node ? node.htmlCode : '', '  ')
      this.htmlCode = beautify.result

    },

    resizeScreen(breakPoint){
      this.breakPoint = breakPoint
      this.options.forEach(optionGroup=>{
        optionGroup.changeBreakPoint(breakPoint)
        optionGroup.resolveValue(this.node)
      })
    },

    onOptionValueChange(){
      this.options.forEach(optionGroup=>{
        optionGroup.fillBackValue(this.node)
      })
      $bus.$emit('shellChangedNode', this.node, this.pageId)
    },

    onOverViewValueChange(){
      this.options.forEach(optionGroup=>{
        optionGroup.resolveValue(this.node)
      })
      $bus.$emit('shellChangedNode', this.node, this.pageId)
    },

    onStyleValueChange(){
      $bus.$emit('shellChangedNode', this.node, this.pageId)
    },

    loadCssAndJs(proOrTheme){
      this.$store.commit('isLoading', true)
      let files = []
      proOrTheme.styles.forEach(file=>{
        if(!file.locked){
          files.push(file)
        }
      })

      proOrTheme.javascript.forEach(file=>{
        if(!file.locked){
          files.push(file)
        }
      })

      $axios.all(files.map(data=>{
        return $axios.get(data.path)
      }))
      .then((responses)=>{
        for(var i = 0; i < responses.length; i++){
          this.$set(files[i], "code", responses[i].data)
        }
        this.$store.commit('isLoading', false)
      })
    },

  },

  mounted () {
    $bus.$on('editNode', this.onEditNode)
    //$bus.$on('unFocusNode', this.unFocusNode)
    $bus.$on('optionValueChange', this.onOptionValueChange)
    $bus.$on('overViewValueChange', this.onOverViewValueChange)
    $bus.$on('styleValueChange', this.onStyleValueChange)
    $bus.$on('resizeScreen', this.resizeScreen)
    $bus.$on('showNodeTree', this.onShowNodeTree)


    this.$store.commit('themeChange', null)
    $axios.get('api/theme/vular')
    .then((res)=>{
      this.$store.commit('themeChange', res.data)
    })

    $axios.get("api/toolbox").then((res)=>{
      this.baseToolbox = res.data
    })

  },

  beforeDestroyed() {
    $bus.$off('editNode', this.onEditNode)
    //$bus.$off('unFocusNode', this.unFocusNode)
    $bus.$off('optionValueChange', this.onOptionValueChange)
    $bus.$off('overViewValueChange', this.onOverViewValueChange)
    $bus.$off('styleValueChange', this.onStyleValueChange)
    $bus.$off('resizeScreen', this.resizeScreen)
    $bus.$off('showNodeTree', this.onShowNodeTree)
  },

}
</script>

<style>
.loading-box{
  position: fixed;
  z-index: 99999;
  top:0;
  height: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
