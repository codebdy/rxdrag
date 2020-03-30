<template>
  <div class="html-page"
    :class="state.preview ? 'page-preview' : 'html-page'"
  >
    <div class="page-toolbar">
      <div class="left">
        <div class="icon-button big" 
          :class="{
            'active' : state.screenWidth === 'xl',
            'disabled' : viewCode
          }"
          @click="resizeScreen('xl')"
          title = "XL"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'lg',
            'disabled' : viewCode
          }"
          @click="resizeScreen('lg')"
          title = "LG"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'md',
            'disabled' : viewCode
          }"
          @click="resizeScreen('md')"
          title = "MD"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button"
          :class="{
            'active' : state.screenWidth === 'sm',
            'disabled' : viewCode
          }"
          @click="resizeScreen('sm')"
          title = "SM"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button"
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
      <div class="center"></div>
      <div class="right">
        <div class="icon-button" 
          v-if="!state.preview"
          :class = "{
            'active' : state.showOutline,
            'disabled' : viewCode
          } "
          :title="$t('page-toolbar.outline')"
          @click="outlineClick">
          <i class="far fa-square"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :class = "{
            'active' : state.showMarginX,
            'disabled' : viewCode 
          }"
          :title="$t('page-toolbar.margin-x')"
          @click = "marginXClick"
        >
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :class = "{
            'active' : state.showMarginY,
            'disabled' : viewCode 
          }"
          :title="$t('page-toolbar.margin-y')"
          @click = "marginYClick"
        >
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="icon-button"
          :title="state.preview ? $t('page-toolbar.cancel-preview') : $t('page-toolbar.preview')"
          :class = "{
            'active' : state.preview,
            'disabled' : viewCode
          }"
          @click = "previewClick"
        >
          <i class="fas fa-eye"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.code')"
          :class = "viewCode ?'active' :'' "
          @click = "codeClick"
        >
          <i class="fas fa-code"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.undo')"
          :class = "{
            'disabled' : viewCode
          }"
        >
          <i class="fas fa-undo"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.redo')"
          :class = "{
            'disabled' : viewCode
          }"
        >
          <i class="fas fa-redo"></i>
        </div>
        <div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.clear-canvas')"
          :class = "{
            'disabled' : viewCode
          }"
        >
          <i class="fas fa-trash-alt"></i>
        </div>
        <!--div class="icon-button"
          v-if="!state.preview"
          :title="$t('page-toolbar.settings')"
        >
          <i class="fas fa-cog"></i>
        </div-->
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
          scrolling="no" 
          frame-border ="0"
          border = "0"
          allow-transparency = "no"
          :height="canvasHeight" 
          ref ="canvasFrame"
        ></iframe>
      </div>
      <textarea class="code-editor"
        v-show = "viewCode"
        v-model = "htmlCode"
      ></textarea>
    </div>
  </div>
</template>

<script>
import {IFrameCommandProxy} from "./IFrameCommandProxy"
import {NodeTree} from "./NodeTree"
import {HtmlBeautify} from "../../basic/HtmlBeautify"

export default {
  name: 'HtmlPage',
  components:{
  },
  props:{
    value:{ default:()=>{return{}} },
    breakpoints : {
      default : ()=>{ 
        this.xs = '490'
        this.sm = '576'
        this.md = '768'
        this.lg = '992'
        this.xl = '1200'
        return this
      }
    }, 
  },
  data () {
    return {
      //content:`<div class="container"></div>`,
      commandProxy: new IFrameCommandProxy(this._uid),
      //actived: false,
      canvasHeight: '100%',
      htmlCode:'',
      oldHtmlCode:'',
      nodeTree: new NodeTree,
      focusNode : null,
      state:{
        showOutline: true,
        showEditMargin: true,
        showMarginX:true,
        showMarginY:true,
        screenWidth:'md',
        preview: false,
      },
      viewCode : false,
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

    actived(){
      return this.inputValue === this.$store.state.activedFile
    },

    width(){
      return this.breakpoints[this.state.screenWidth] + 'px'
    }
  },

  mounted () {
    this.pageId = this._uid
    this.commandProxy.serveForShell = this
    this.commandProxy.iframe = this.$refs.canvasFrame
    //$bus.$on('activedFile', this.onFileActived)
    $bus.$on('draggingFromToolbox', this.draggingFromToolbox)
    $bus.$on('shellChangedNode', this.nodeChanged)
    $bus.$on('canvasHeight', this.onCanvasHeight)
    $bus.$on('commandExcuted', this.onCommandExcuted)
    $bus.$on('focusNode', this.onFocusNode)
    $bus.$on('unFocusNode', this.onUnFocusNode)
    $bus.$on('nodeSelected', this.onNodeSelected)
    this.initFrame()
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('keyup', this.onKeyup)
    window.addEventListener("message", this.receiveCanvasMessage)
    $bus.$on('duplicateNode', this.onDuplicateNode)
    $bus.$on('removeNode', this.onRemoveNode)
    $bus.$on('replyHtmlCode', this.onReplyHtmlCode)
    $bus.$on('nodeHtmlChanged', this.onNodeHtmlChanged)

    this.emitShellState()
  },

  destoryed () {
    //delete window.$editorBus
    $bus.$off('draggingFromToolbox', this.draggingFromToolbox)
    $bus.$off('shellChangedNode', this.nodeChanged)
    $bus.$off('canvasHeight', this.onCanvasHeight)
    $bus.$off('commandExcuted', this.onCommandExcuted)
    $bus.$off('focusNode', this.onFocusNode)
    $bus.$off('unFocusNode', this.onUnFocusNode)
    $bus.$off('nodeSelected', this.onNodeSelected)
    $bus.$off('duplicateNode', this.onDuplicateNode)
    $bus.$off('removeNode', this.onRemoveNode)
    $bus.$off('replyHtmlCode', this.onReplyHtmlCode)
    $bus.$off('nodeHtmlChanged', this.onNodeHtmlChanged)

    window.removeEventListener("message", this.receiveCanvasMessage);
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keyup', this.onKeyup)
  },

  methods: {
    resizeScreen(size){
      this.state.screenWidth = size
      this.commandProxy.changeCanvasState(this.state)
      $bus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
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
      this.commandProxy.changeCanvasState(this.state)
    },

    codeClick(){
      this.viewCode = !this.viewCode
      if(this.viewCode){
        this.commandProxy.requestHtmlCode()
      }
      else{
        if(this.oldHtmlCode != this.htmlCode){
          this.commandProxy.loadHtml(this.htmlCode)
        }
      }
    },

    draggingFromToolbox(item){
      if(this.actived){
        //console.log('send in HTMLPage', this.inputValue.title)
        this.commandProxy.draggingFromToolbox(item)
      }
    },

    onRxEditorReady(){
      //console.log(this._uid)
      this.commandProxy.changeCanvasState(this.state)
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
      if(this.actived){
        this.commandProxy.endDragFromToolbox()
      }
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

      this.nodeTree.excuteCommand(commandSchema)

      $bus.$emit('showNodeTree', this.nodeTree.children)
    },

    onFocusNode(node, pageId){
      if(pageId !== this.pageId){
        return
      }
      this.focusNode = node
      this.nodeTree.selectNode(node.id)
      $bus.$emit('showNodeTree', this.nodeTree.children)
      $bus.$emit('editNode', this.focusNode, this.pageId)
    },

    onUnFocusNode(id, pageId){
      if(pageId !== this.pageId){
        return
      }
      if(this.focusNode && this.focusNode.id === id){
        this.focusNode = null
      }
      this.nodeTree.unSelectNode(id)
      $bus.$emit('editNode', null)
    },

    onNodeSelected(node){
      if(this.actived){
        this.commandProxy.focusNodeFromShell(node)
      }
    },

    onDuplicateNode(id){
      if(this.actived){
        this.commandProxy.duplicateNodeFromShell(id)
      }
    },

    onRemoveNode(id){
      if(this.actived){
        this.commandProxy.removeNodeFromShell(id)
      }
    },

    onReplyHtmlCode(htmlCode){
      if(this.actived){
        let beautify = new HtmlBeautify(htmlCode, '  ')
        this.htmlCode = beautify.result
        this.oldHtmlCode = this.htmlCode
      }
    },

    onNodeHtmlChanged(html){
      if(this.focusNode && this.actived){
        this.commandProxy.loadHtml(html, this.focusNode.id)
      }
    },

    initFrame(){
      let iframedocument =  this.$refs.canvasFrame.contentDocument;//contentWindow.document;
      let iframeContent = `<html style="width:100%;height:100%;">
            <head>
              <title>RXEditor Workspace</title>
              <link href="style/rxeditor.css" rel="stylesheet">
              <link href="vendor/bootstrap-4.4.1-dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body id="page-top" style="background-color:#FFF;padding:0;width:100%; height:100%;">
              <div id="canvas"></div>
              <script type="text/javascript" src="dist/core.js"/><\/script>
              <script>
                creatEditorCore(${this.pageId})
                rxEditor.hangOn('canvas');
              <\/script>
            </body>
          </html>
        `
      iframedocument.open();
      iframedocument.write(iframeContent);
      iframedocument.close();
    },

    emitShellState(){
      $bus.$emit('showNodeTree', this.nodeTree.children)
      $bus.$emit('editNode', this.focusNode, this.pageId)
      $bus.$emit('resizeScreen', this.state.screenWidth, this.pageId)
    }
  },

  watch:{
    actived(val){
      if(val){
        this.emitShellState()
      }
    }
  }
}
</script>

<style>
 .html-page{
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 0;
  }

  .page-preview{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
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
    background: #fff;
  }

  .canvas iframe{
    width: 100%;
    min-height:calc(100vh - 112px);
    border:0;
  }

  .code-editor{
    width: calc(100% - 20px);
    background: #272727;
    height: calc(100% - 26px);
    color:#75b325;
    outline: 0;
    border:0;
    padding:10px;
    resize: none;
  }


</style>