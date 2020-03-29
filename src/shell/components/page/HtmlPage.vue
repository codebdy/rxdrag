<template>
  <div class="html-page">
    <div class="page-toolbar">
      <div class="left">
        <div class="icon-button big" 
          :class="size === 'xl' ? 'active' :''"
          @click="resizeScreen('xl')"
          title = "XL"
        >
          <i class="fas fa-tv"></i>
        </div>
        <div class="icon-button"
          :class="size === 'lg' ? 'active' :''"
          @click="resizeScreen('lg')"
          title = "LG"
        >
          <i class="fas fa-desktop"></i>
        </div>
        <div class="icon-button"
          :class="size === 'md' ? 'active' :''"
          @click="resizeScreen('md')"
          title = "MD"
        >
          <i class="fas fa-laptop"></i>
        </div>
        <div class="icon-button"
          :class="size === 'sm' ? 'active' :''"
          @click="resizeScreen('sm')"
          title = "SM"
        >
          <i class="fas fa-tablet-alt"></i>
        </div>
        <div class="icon-button"
          :class="size === 'xs' ? 'active' :''"
          @click="resizeScreen('xs')"
          title = "XS"
        >
          <i class="fas fa-mobile-alt"></i>
        </div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="icon-button" 
          :class = "state.showOutline ?'active' :'' "
          :title="$t('page-toolbar.outline')"
          @click="outlineClick">
          <i class="far fa-square"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-arrows-alt-h"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-arrows-alt-v"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-eye"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-code"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-undo"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-redo"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-trash-alt"></i>
        </div>
        <div class="icon-button">
          <i class="fas fa-cog"></i>
        </div>
      </div>
    </div>
    <div class="page-content">
      <!-- 需要动态设定高度，当内容有变化时设定 -->
      <div class="canvas"
        :style = "{width:width}"
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
    </div>
  </div>
</template>

<script>
import {IFrameCommandProxy} from "./iframe-command-porxy.js"
import {NodeTree} from "./NodeTree"

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
      size : 'md',
      //content:`<div class="container"></div>`,
      commandProxy: new IFrameCommandProxy(this._uid),
      //actived: false,
      canvasHeight: '100%',
      html:'',
      nodeTree: new NodeTree,
      focusNode : null,
      state:{
        showOutline: true,
        showEditMargin: true,
      }
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
      return this.breakpoints[this.size] + 'px'
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
    window.addEventListener("message", this.receiveCanvasMessage)
    $bus.$on('duplicateNode', this.onDuplicateNode)
    $bus.$on('removeNode', this.onRemoveNode)

    $bus.$emit('showNodeTree', this.nodeTree.children)
    $bus.$emit('editNode', this.focusNode, this.pageId)
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

    window.removeEventListener("message", this.receiveCanvasMessage);
    document.removeEventListener('mouseup', this.onMouseUp)
  },

  methods: {
    resizeScreen(size){
      this.size = size
    },

    outlineClick(){
      this.state.showOutline = !this.state.showOutline
      this.commandProxy.changeCanvasState(this.state)
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
      if(pageId === this.pageId){
        this.canvasHeight = height + 'px'
      }
    },

    onMouseUp(){
      if(this.actived){
        this.commandProxy.endDragFromToolbox()
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
      if(this.focuseNode && this.focuseNode.id === id){
        this.focuseNode = null
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
    }
  },

  watch:{
    size(val){
      $bus.$emit('resizeScreen', this.size, this.pageId)
    },

    actived(val){
      if(val){
        $bus.$emit('showNodeTree', this.nodeTree.children)
        $bus.$emit('editNode', this.focusNode, this.pageId)
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
</style>