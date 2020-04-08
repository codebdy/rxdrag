<template>
  <div class="rxpage-editor"
    :class="fullScreen ? 'full-screen' :''"
  >
    <div class="rx-toolbar">
      <div class="left">
        <div class="rx-icon-button big" 
          :class="{
            'active' : state.screenWidth === 'xl',
            'disabled' : viewCode
          }"
          @click="resizeScreen('xl')"
          title = "XL"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="rx-icon-button"
          :class="{
            'active' : state.screenWidth === 'lg',
            'disabled' : viewCode
          }"
          @click="resizeScreen('lg')"
          title = "LG"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="rx-icon-button"
          :class="{
            'active' : state.screenWidth === 'md',
            'disabled' : viewCode
          }"
          @click="resizeScreen('md')"
          title = "MD"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="rx-icon-button"
          :class="{
            'active' : state.screenWidth === 'sm',
            'disabled' : viewCode
          }"
          @click="resizeScreen('sm')"
          title = "SM"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="rx-icon-button"
          :class="{
            'active' : state.screenWidth === 'xs',
            'disabled' : viewCode
          }"
          @click="resizeScreen('xs')"
          title = "XS"
        >
          <i class="fas fa-mobile-alt"></i>
        </div>

      </div>
      <div class="right ">
        <div class="rx-icon-button" 
          title = ""
          :class="{active:toolbox}"
          @click ="toolbox = !toolbox"
        >
          <i class="fas fa-tools"></i>
        </div>
        <div class="rx-icon-button" title = ""
          :class="{active:optionbox}"
          @click = "optionbox = !optionbox">
          <i class="fas fa-paint-brush"></i>
        </div>
        <!--div class="rx-icon-button small" title = "">
          <i class="fas fa-project-diagram"></i>
        </div-->
        <div class="rx-icon-button" title = "">
          <i class="far fa-square"></i>
        </div>
        <div class="rx-icon-button" title = "">
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="rx-icon-button" title = "">
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="rx-icon-button" title = "">
          <i class="fas fa-eye"></i>
        </div>
        <div class="rx-icon-button" title = "">
          <i class="fas fa-code"></i>
        </div>
        <div class="rx-icon-button small" title = "">
          <i class="fas fa-undo"></i>
        </div>
        <div class="rx-icon-button small" title = "">
          <i class="fas fa-redo"></i>
        </div>
        <div class="rx-icon-button ex-big" title = ""
          :class="{active : fullScreen}"
          @click = "fullScreen = !fullScreen"
        >
          <i class="fas fa-arrows-alt" 
            style="transform:rotate(45deg);font-size:18px;"
          ></i>
        </div>
        <div class="rx-icon-button ex-big" title = "">
          <i class="fas fa-question-circle" ></i>
        </div>
        <div class="rx-icon-button big" title = "">
          <i class="fas fa-layer-group" ></i>
        </div>
      </div>
    </div>
    <div class="page-content"
    >
      <!-- 需要动态设定高度，当内容有变化时设定 -->
      <div class="canvas"
        :style = "{width:width}"
        v-show = "!viewCode"
      >
        <iframe src="javascrip:0" 
          :style="{
            display:state.preview ? 'none' :'block'
          }"
          scrolling="no" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
          :height="canvasHeight" 
          ref ="canvasFrame"
        ></iframe>

        <iframe src="javascrip:0" 
          :style="{
            display:state.preview ? 'block' :'none'
          }"
          scrolling="yes" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
          ref ="previewFrame"
        ></iframe>
      </div>
      <textarea class="code-editor"
        v-show = "viewCode"
        v-model = "inputValue.code"
      ></textarea>
    </div>
    <MiniWidget v-model="toolbox">
      <WidgetTabs>
        <Tab 
          :name="$t('widgets.studio')"
          :icon="'fas fa-puzzle-piece'" 
          :selected="true"
        >
          <Toolbox :groups="toolboxItems"></Toolbox>
        </Tab>
      </WidgetTabs>
    </MiniWidget>
    <MiniWidget :top="100" :left="20" v-model="optionbox">Option Box</MiniWidget>
  </div>
</template>

<script>
import Vue from 'vue'
import {Config} from "./Config"
import MiniWidget from './components/MiniWidget.vue'
import WidgetTabs from '../shell/components/tabs/WidgetTabs.vue'
import Tab from '../shell/components/tabs/Tab.vue'
import Toolbox from '../shell/components/Toolbox/Toolbox.vue'
import toolboxItems from './ToolboxItems'
import {IFrameCommandProxy} from "../shell/components/page/IFrameCommandProxy"
import {HtmlBeautify} from "../shell/basic/HtmlBeautify"

export default {
  name: 'rxpage',
  components:{
    MiniWidget,
    WidgetTabs,
    Tab,
    Toolbox
  },
  props:{
    value : { default:'<div class="container">test</div>' }, 
    breakpoints : {
      default : ()=>{ 
        this.xs = '490'
        this.sm = '576'
        this.md = '768'
        this.lg = '992'
        this.xl = '1200'
        return this
      }
    }
  },
  data () {
    return {
      config : new Config(this._uid),
      toolbox : false,
      optionbox : false,
      fullScreen : false,
      toolboxItems: toolboxItems,
      commandProxy : new IFrameCommandProxy(this._uid),
      canvasHeight : '400px',
      oldHtmlCode :'',
      focusNode : null,
      state:{
        showOutline : true,
        showEditMargin : true,
        showMarginX : true,
        showMarginY : true,
        screenWidth : 'md',
        preview : false,
      },
      viewCode : false,
      canUndo : false,
      canRedo : false,
    }
  },

  computed:{
    inputValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val);
      },
    },
    width(){
      if(this.state.preview && this.state.screenWidth === 'xl'){
        return "100%"
      }
      return this.breakpoints[this.state.screenWidth] + 'px'
    }
  },

  mounted () {
    this.pageId = this._uid
    this.commandProxy.serveForShell = this
    this.commandProxy.iframe = this.$refs.canvasFrame
    $rxbus.$on('draggingFromToolbox', this.draggingFromToolbox)
    $rxbus.$on('shellChangedNode', this.nodeChanged)
    $rxbus.$on('canvasHeight', this.onCanvasHeight)
    $rxbus.$on('commandExcuted', this.onCommandExcuted)
    $rxbus.$on('focusNode', this.onFocusNode)
    $rxbus.$on('unFocusNode', this.onUnFocusNode)
    $rxbus.$on('nodeSelected', this.onNodeSelected)
    this.initFrame()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keyup', this.onKeyup)
    window.addEventListener("message", this.receiveCanvasMessage)
    $rxbus.$on('replyHtmlCode', this.onReplyHtmlCode)
    $rxbus.$on('nodeHtmlChanged', this.onNodeHtmlChanged)
    $rxbus.$on('codeFileChange', this.onCodeFileChange)

    this.emitShellState()
  },

  beforeDestroyed() {
    $rxbus.$off('draggingFromToolbox', this.draggingFromToolbox)
    $rxbus.$off('shellChangedNode', this.nodeChanged)
    $rxbus.$off('canvasHeight', this.onCanvasHeight)
    $rxbus.$off('commandExcuted', this.onCommandExcuted)
    $rxbus.$off('focusNode', this.onFocusNode)
    $rxbus.$off('unFocusNode', this.onUnFocusNode)
    $rxbus.$off('nodeSelected', this.onNodeSelected)
    $rxbus.$off('replyHtmlCode', this.onReplyHtmlCode)
    $rxbus.$off('nodeHtmlChanged', this.onNodeHtmlChanged)
    $rxbus.$off('codeFileChange', this.onCodeFileChange)

    window.removeEventListener("message", this.receiveCanvasMessage);
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keyup', this.onKeyup)
  },

  methods:{
    initFrame(){
      let iframedocument =  this.$refs.canvasFrame.contentDocument;
      let iframeContent = this.config.getCanvasHtml()
      iframedocument.open();
      iframedocument.write(iframeContent);
      iframedocument.close();
    },

    resizeScreen(size){
      this.state.screenWidth = size
      this.commandProxy.changeCanvasState(this.state)
      $rxbus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
    },

    outlineClick(){
      this.state.showOutline = !this.state.showOutline
      this.commandProxy.changeCanvasState(this.state)
    },

    marginXClick(){
      this.state.showMarginX = !this.state.showMarginX
      this.commandProxy.changeCanvasState(this.state)
    },

    marginYClick(){
      this.state.showMarginY = !this.state.showMarginY
      this.commandProxy.changeCanvasState(this.state)
    },

    previewClick(){
      this.state.preview = !this.state.preview
      this.commandProxy.requestHtmlCode()

    },

    codeClick(){
      this.viewCode = !this.viewCode
      if(this.viewCode){
        this.commandProxy.requestHtmlCode()
      }
      else{
        if(this.oldHtmlCode != this.inputValue){
          this.commandProxy.loadHtml(this.inputValue)
        }
      }
    },

    undoClick(){
      this.commandProxy.undo()
    },

    redoClick(){
      this.commandProxy.redo()
    },

    clearCanvasClick(){
      this.commandProxy.clearCanvas()
    },


    draggingFromToolbox(item){
      this.commandProxy.draggingFromToolbox(item)
    },

    onRxEditorReady(){
      //console.log(this._uid)
      this.commandProxy.changeCanvasState(this.state)
      this.sentHtmlToCanvas()
    },

    sentHtmlToCanvas(){
      this.commandProxy.loadHtml(this.inputValue)
      this.setInlineCssAndJs()
    },

    nodeChanged(node, pageId){
      if(pageId === this.pageId){
        this.commandProxy.nodeChanged(node)
      }
    },

    onCanvasHeight(height, pageId){
      if(pageId === this.pageId && !this.state.preview){
        this.canvasHeight = height + 'px'
      }
    },

    onMouseUp(){
      this.commandProxy.endDragFromToolbox()
    },

    onKeyup(event){
      if(event && event.keyCode === 27){ 
        this.state.preview = false
        this.commandProxy.changeCanvasState(this.state)
      }
    },

    onCommandExcuted(canUndo, canRedo, commandSchema, pageId){
      if(pageId !== this.pageId){
        return
      }

      this.canUndo = canUndo
      this.canRedo = canRedo
    },

    onFocusNode(node, pageId){
      if(pageId !== this.pageId){
        return
      }
      this.focusNode = node
      $rxbus.$emit('editNode', this.focusNode, this.pageId)
    },

    onUnFocusNode(id, pageId){
      if(pageId !== this.pageId){
        return
      }
      if(this.focusNode && this.focusNode.id === id){
        this.focusNode = null
      }
      $rxbus.$emit('editNode', null)
    },

    onNodeSelected(node){
      this.commandProxy.focusNodeFromShell(node)
    },

    onReplyHtmlCode(code){
      let beautify = new HtmlBeautify(code, '  ')
      this.inputValue.code = beautify.result
      this.oldHtmlCode = code
      if(this.state.preview){
        this.writeToPreviewFrame(code)
      }
    },

    onNodeHtmlChanged(html){
      if(this.focusNode){
        this.commandProxy.loadHtml(html, this.focusNode.id)
      }
    },

    onCodeFileChange(file){
      this.commandProxy.setInlineFile(file)
    },

    setInlineCssAndJs(){
      this.config.styles.forEach(file=>{
        if(!file.locked){
          this.commandProxy.setInlineFile(file)
        }
      })

      this.config.javascript.forEach(file=>{
        if(!file.locked){
          this.commandProxy.setInlineFile(file)
        }
      })
    },

    writeToPreviewFrame(code){
      let iframedocument =  this.$refs.previewFrame.contentDocument;

      let iframeContent = this.$store.state.project.getPreviewHtml(this.$store, code)
      iframedocument.open();
      iframedocument.write(iframeContent);
      iframedocument.close();
    },

    emitShellState(){
      //$rxbus.$emit('showNodeTree', this.nodeTree.children)
      $rxbus.$emit('editNode', this.focusNode, this.pageId)
      $rxbus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
    }

  },

  created () {
    if(!window.$rxbus){
      window.$rxbus= new Vue()
    }
  },


}
</script>

<style>
  .can-not-be-selected{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .rxpage-editor ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    background: #aaa;
  }
  .rxpage-editor ::-webkit-scrollbar-track {
    border-radius: 0;
  }
  .rxpage-editor ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #ccc;
    transition: all .2s;
  }
  .rxpage-editor ::-webkit-scrollbar-thumb:hover {
    background-color: #ddd;
  }

  .rxpage-editor ::-webkit-scrollbar-corner{
    background: transparent;
  }

  .rxpage-editor{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    border:0;
    z-index: 99;
    background: #eee;
  }

  .rxpage-editor.full-screen{
    position: fixed;
    top : 0;
    left : 0;
  }

  .rxpage-editor .rx-toolbar{
    height: 40px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    background: #45484c;
    color: #c6d0db;
    font-size: 13px;
  }

  .rxpage-editor .rx-toolbar .left{
    display: flex;
    flex-flow: row;
  }


  .rxpage-editor .rx-toolbar .rx-icon-button{
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:1px;
    border-radius: 2px;
  }

  .rxpage-editor .rx-toolbar .right{
    display: flex;
    flex-flow: row;
  }
  .rxpage-editor .rx-toolbar .right .rx-icon-button{
    font-size: 14px;
  }

  .rxpage-editor .rx-toolbar .rx-icon-button:hover{
    background: rgba(0,0,0,0.3);
  }

  .rxpage-editor .rx-toolbar .rx-icon-button.active{
    background: rgba(0,0,0,0.5);
  }

  .rxpage-editor .rx-toolbar .rx-icon-button.big i{
    font-size: 14px;
  }

  .rxpage-editor .rx-toolbar .rx-icon-button.small i{
    font-size: 12px;
  }

  .rxpage-editor .rx-toolbar .rx-icon-button.ex-big i{
    font-size: 16px;
  }


  .rxpage-editor .rx-toolbar .rx-icon-button.disabled{
    pointer-events: none;
    position: relative;
  }

  .rxpage-editor .rx-toolbar .rx-icon-button.disabled::after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73,76,69,0.7);
    z-index: 1;
  }

  .page-preview{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #272727;
    z-index: 1;
  }

  .page-content{
    flex: 1;
    height: 0;
    overflow: auto;
    display: block;
  }

  .canvas{
    margin:0 auto ; 
    transition: all 0.5s;
  }

  .canvas iframe{
    width: 100%;
    min-height: 500px;
    border:0;
  }

  .page-preview .canvas iframe{
    height: calc(100vh - 40px)
  }


</style>
