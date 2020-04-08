<template>
  <div class="vular-studio">
    <div v-if="$store.state.isLoading" class="loading-box">
      <img src="images/loading.gif"/>
    </div>
    <Toolbar
      @changeTheme = "changeTheme"
      @openProject = "openProject"
      @download = "onDownload"
    ></Toolbar>
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
//import nodesData from '../mock/nodes.js'
//import options from '../mock/options.js'
//import toolbox from '../mock/toolbox.js'

import {OptionsFactory} from './schemas/OptionsFactory'
import {HtmlBeautify} from "./basic/HtmlBeautify"
import {Project} from "./Project"

var JSZip = require("jszip")
var FileSaver = require('file-saver');

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
    '$store.state.project': function (project) {
      $rxbus.$emit('projectChanged', project)
      this.showFiles(project)
      //Load theme
      if(project.theme){
        $axios.get(project.theme)
        .then((res)=>{
          this.$store.commit('themeChange', res.data)
        })
      }
    }
  },

  methods:{
    nodeSelected(node){
      $rxbus.$emit('nodeSelected', node)
    },

    fileSelect(file){
      $rxbus.$emit('fileSelected', file)
    },
    changeTheme(theme){
      if(!theme.api){
        return
      }
      $axios.get(theme.api)
      .then((res)=>{
        let project = new Project(res.data)
        this.$store.commit('projectChange', project)
        this.$store.commit('themeChange', res.data)
      })
    },

    openProject(project){
      project = new Project(project)
      this.$store.commit('projectChange', project)
      this.showFiles(project)
    },

    showFiles(project){
      this.files = project
      this.loadCssAndJs(project)
      if(this.files.pages.length > 0){
        $rxbus.$emit('fileSelected', this.files.pages[0])
      }
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
      $rxbus.$emit('shellChangedNode', this.node, this.pageId)
    },

    onOverViewValueChange(){
      this.options.forEach(optionGroup=>{
        optionGroup.resolveValue(this.node)
      })
      $rxbus.$emit('shellChangedNode', this.node, this.pageId)
    },

    onStyleValueChange(){
      $rxbus.$emit('shellChangedNode', this.node, this.pageId)
    },

    loadCssAndJs(project){
      if(!project) {
        this.$store.commit('isLoading', false)
        return
      }
      this.$store.commit('isLoading', true)
      let files = []
      project.styles.forEach(file=>{
        if(!file.locked){
          files.push(file)
        }
      })

      project.javascript.forEach(file=>{
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

    onDownload(){
      let themZipPath = this.$store.state.theme.zip
      if(themZipPath){
        $axios.get(themZipPath,{responseType:'blob'})
        .then((res)=>{
          this.loadZipFile(res.data)
        })
      }
    },

    loadZipFile(file){
      let zip = new JSZip();
      let filesNeedDownload = []
      zip.loadAsync(file)
      .then(zip=>{
        //输出已经加载的HTML，并记录未加载的文件
        this.$store.state.project.pages.forEach(file=>{
          if(file.code){
            zip.file(file.name, this.makeHtml(file.code))
          }
          else{
            filesNeedDownload.push(file)
          }
        })
        this.saveCssFiles(zip)
        this.saveJsFiles(zip)
        this.saveFile(zip)
      })
    },

    saveCssFiles(zip){
      this.$store.state.project.styles.forEach(file=>{
        if(!file.locked){
          zip.folder('css').file(file.name, file.code)
        }
      })
    },

    saveJsFiles(zip){
      zip.folder('js')
      this.$store.state.project.javascript.forEach(file=>{
        if(!file.locked){
          zip.folder('js').file(file.name, file.code)
        }
      })
    },

    makeHtml(htmlCode){
      let html = this.$store.state.project.getRealHtml(this.$store, htmlCode)
      let beautify = new HtmlBeautify(html, '  ')
      return beautify.result
    },

    saveFile(zip){
      zip.generateAsync({type:"blob"})
      .then(function(content) {
        saveAs(content, "RX-HTML.zip");
      });      
    }

  },

  mounted () {
    $rxbus.$on('editNode', this.onEditNode)
    //$rxbus.$on('unFocusNode', this.unFocusNode)
    $rxbus.$on('optionValueChange', this.onOptionValueChange)
    $rxbus.$on('overViewValueChange', this.onOverViewValueChange)
    $rxbus.$on('styleValueChange', this.onStyleValueChange)
    $rxbus.$on('resizeScreen', this.resizeScreen)
    $rxbus.$on('showNodeTree', this.onShowNodeTree)


    this.$store.commit('projectChange', null)
    $axios.get('api/project/vular')
    .then((res)=>{
      this.$store.commit('projectChange', new Project(res.data))
    })

    $axios.get("api/toolbox").then((res)=>{
      this.baseToolbox = res.data
    })

  },

  beforeDestroyed() {
    $rxbus.$off('editNode', this.onEditNode)
    //$rxbus.$off('unFocusNode', this.unFocusNode)
    $rxbus.$off('optionValueChange', this.onOptionValueChange)
    $rxbus.$off('overViewValueChange', this.onOverViewValueChange)
    $rxbus.$off('styleValueChange', this.onStyleValueChange)
    $rxbus.$off('resizeScreen', this.resizeScreen)
    $rxbus.$off('showNodeTree', this.onShowNodeTree)
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
